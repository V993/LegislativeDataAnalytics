/*
Implements the methods prototyped in vote-parser.hpp
SAMUEL EBERSOLE
10.23.21
*/

#include "vote-parser.hpp"
using namespace ld_proximity;

VoteParser::VoteParser() {
  std::cout << "VoteParser Constructor" << std::endl;
}

std::vector<VoteRollItem> VoteParser::read_file(std::string fname)
{
  std::cout << "Called read_file(" << fname << ")" << std::endl;
  std::ifstream ifile;
  ifile.open(fname);
  std::vector<VoteRollItem> v;

  std::string line;
  bool in_block = false;
  std::string repName = "";
  int vote = 0;
  int matterId = 0;
  std::string val = "";
  std::vector<VoteRollItem> prox;

  if (ifile.is_open())
  {
    std::cout << "Opened file for reading" << std::endl;
    // PARSE FILE
    while (getline (ifile, line))
    {
        val = "";
        for (int i = 0; i < line.length(); i++)
        {
          if (line[i] == '{' && !in_block) { in_block = true; }
          if (line[i] == '}' && in_block)
          {
            in_block = false;
            VoteRollItem v;
            v.repName = repName;
            v.matterId = matterId;
            v.vote = vote;
            std::cout << "-------------------------------------------" << std::endl;
            std::cout << v.repName << " " << v.matterId;
            if (in_targets(v.repName)) { prox.push_back(v); std::cout << " IN TARGETS" << std::endl; }
            else { std::cout << " NOT IN TARGETS" << std::endl; }
            std::cout << "-------------------------------------------" << std::endl;
          }
        }
        if (in_block)
        {
          if (line.find("voteeventitemid") != std::string::npos)
          {
            //std::cout << "-------------------------------------------" << std::endl;
            //std::cout << line << std::endl;
            bool post_colon = false;
            for (int j = 0; j < line.length(); j++)
            {
              if (line[j] == ':') { post_colon = true; }  // Ignore "matterId"
              else if (j == line.length() - 1)                    // At end of line, turn set matterId and reset val
              {
                val += line[j];
                //std::cout << val << std::endl;
                matterId = std::stoi(val);
                //std::cout << matterId << std::endl;
                val = "";
                post_colon = false;
              }
              else if (post_colon)                        // Apend character to val
              {
                val += line[j];
              }
            }
          }
          else if (line.find("votepersonname") != std::string::npos)
          {
            //std::cout << "-------------------------------------------" << std::endl;
            //std::cout << line << std::endl;
            int quotes = 0;
            for (int j = 0; j < line.length(); j++)
            {
              if (line[j] == '"' && quotes < 3) { quotes++; }
              else if (line[j] == '"' && quotes == 3)
              {
                repName = val;
                //std::cout << repName << std::endl;
                val = "";
                quotes++;
              }
              else if (quotes < 4 && quotes > 2) { val += line[j]; }
            }
          }
          else if (line.find("votevaluename") != std::string::npos)
          {
            //std::cout << "-------------------------------------------" << std::endl;
            //std::cout << line << std::endl;
            int quotes = 0;
            for (int j = 0; j < line.length(); j++)
            {
              if (line[j] == '"' && quotes < 3) { quotes++; }
              else if (line[j] == '"' && quotes == 3)
              {
                //std::cout << val << " ";
                if (val == "Affirmative") { vote = 1; }
                else if (val == "Absent") { vote = -1; }
                else { vote = 0; }
                //std::cout << vote << std::endl;
                val = "";
                quotes++;
              }
              else if (quotes < 4 && quotes > 2) { val += line[j]; }
            }
          }
        }
    }
  }
  return prox;
}

bool VoteParser::write_file(std::vector<Proximity> prox, std::string fname)
{
  std::cout << "Called write_file(" << fname << ")" << std::endl;
  if (prox.size() == 0) { std::cout << "Prox size zero" << std::endl; return false; }
  std::ofstream ofile;
  ofile.open(fname);
  if (ofile.is_open())
  {
    //std::cout << "ofile open" << std::endl;
    ofile << "[" << std::endl;
    for (int i = 0; i < prox.size(); i++)
    {
      ofile << "\t{" << std::endl;
      ofile << "\t\t" << '"' << "repName" << '"' << ": \"" << prox[i].repName << "\"," << std::endl;
      ofile << "\t\t" << '"' << "coordinates" << '"' << ": [";
      std::cout << "prox[i].distances.size() : " << prox[i].distances.size() << std::endl;
      for (int j = 0; j < prox[i].distances.size(); j++)
      {
        std::cout << "prox[" << i << "].distances[" << j << "] : " << prox[i].distances[j] << std::endl;
        ofile << prox[i].distances[j];
        if (j < prox[i].distances.size() - 1) { ofile << ", "; }
      }
      ofile << "]" << std::endl;
      if (i == prox.size() - 1)
      {
        ofile << "\t}" << std::endl;
      }
      else
      {
        ofile << "\t}," << std::endl;
      }
    }
    ofile << "]" << std::endl;
  }
  else { std::cout << "failed to open file" << std::endl; }
  ofile.close();
  return true;
}


// Mutators

bool VoteParser::append_targets(std::vector<std::string> t)
{
  bool any = false;
  for (int i = 0; i < t.size(); i++)
  {
    bool in = false;
    for (int j = 0; j < targets.size(); j++)
    {
      if (t[i] == targets[j]) { in = true; break; }
    }
    if (!in) { targets.push_back(t[i]); any = true; }
  }
  return any;
}

// Accessors

bool VoteParser::in_targets(std::string s)
{
  for (int i = 0; i < targets.size(); i++)
  {
    if (s == targets[i]) { return true; }
  }
  return false;
}
