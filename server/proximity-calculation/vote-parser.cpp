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
            std::cout << v.repName << v.matterId << std::endl;
            prox.push_back(v);
          }
        }
        if (in_block)
        {
          if (line.find("matterId") != std::string::npos)
          {
            bool post_colon = false;
            for (int j = 0; j < line.length(); j++)
            {
              if (line[j] == ':') { post_colon = true; }  // Ignore "matterId"
              else if (line[j] == ',')                    // At end of line, turn set matterId and reset val
              {
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
          else if (line.find("repName") != std::string::npos)
          {
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
          else
          {
            int quotes = 0;
            for (int j = 0; j < line.length(); j++)
            {
              if (line[j] == '"' && quotes < 3) { quotes++; }
              else if (line[j] == '"' && quotes == 3)
              {
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
  //std::cout << "Called write_file(" << fname << ")" << std::endl;
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
      ofile << "\t\t" << '"' << "repName" << '"' << ": " << prox[i].repName << std::endl;
      ofile << "\t\t" << '"' << "x" << '"' << ": " << prox[i].x << std::endl;
      ofile << "\t\t" << '"' << "y" << '"' << ": " << prox[i].y << std::endl;
      ofile << "\t}" << std::endl;
    }
    ofile << "]" << std::endl;
  }
  else { std::cout << "failed to open file" << std::endl; }
  ofile.close();
  return true;
}
