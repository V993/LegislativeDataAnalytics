#include "proximity-calculator.hpp"
#include "vote-parser.hpp"
#include <string>
#include <vector>
#include <iostream>
using namespace ld_proximity;

bool unused(std::vector<std::string> v, std::string n)
{
  for (int i = 0; i < v.size(); i++)
  {
    if (v[i] == n)
    {
      //std::cout << n << " already used" << std::endl;
      return false;
    }
  }
    //std::cout << n << " not already used" << std::endl;
  return true;
}

// Converts all spaces to underscores
std::string underscoreSpaces(std::string s)
{
  std::string n = "";
  bool leading = true;
  for (int i = 0; i < s.length(); i++)
  {
    if (s[i] == ' ')
    {
      if (leading)
      {
      }
      else
      {
        n += '_';
      }
    }
    else
    {
      leading = false;
      n += s[i];
    }
  }
  return n;
}

// Converts all underscores to spaces
std::string spaceUnderscores(std::string s)
{
  std::string n = "";
  bool leading = true;
  for (int i = 0; i < s.length(); i++)
  {
    if (s[i] == '_')
    {
      if (leading)
      {
      }
      else
      {
        n += ' ';
      }
    }
    else
    {
      leading = false;
      n += s[i];
    }
  }
  return n;
}

int main(int argc, char *argv[])
{

  // Parse commandline input
  bool post_refs = false;
  std::vector<std::string> refs;
  std::vector<std::string> targets;
  for (int i = 1; i < argc; i++)
  {
    std::cout << "'" << argv[i] << "'" << std::endl;
    if (std::string(argv[i]) == "targets") { post_refs = true; std::cout << "HIT TARGETS" << std::endl; }
    if (!post_refs) { refs.push_back(spaceUnderscores(argv[i])); }
    else { targets.push_back(spaceUnderscores(argv[i])); }
  }

  // Parse JSON input
  std::cout << "called main()" << std::endl;
  VoteParser vp;
  std::cout << "Created VoteParser" << std::endl;
  vp.append_targets(refs);
  vp.append_targets(targets);

  std::vector<VoteRollItem> testVoteData = vp.read_file("./proximity-calculation/test_vote_data.json");
  std::cout << "VoteParser has completed read_file()" << std::endl;
  /*
  for (int i = 0; i < testVoteData.size(); i++)
  {
    std::cout << "{" << std::endl;
    std::cout << "\t repname: " << testVoteData[i].repName << std::endl;
    std::cout << "}" << std::endl;
  }
  */

  // Calculate proximities
  bool done = false;
  ProximityCalculator pc = ProximityCalculator(testVoteData);

  std::string fname = "./proximity-calculation/responses/";
  for (int i = 0; i < refs.size(); i++)
  {
    std::cout << "ref: " << refs[i] << std::endl;
    pc.add_rep(refs[i]);
    fname += underscoreSpaces(refs[i]);
    if (i != refs.size() - 1) { fname += "_"; }
  }
  fname += ".json";
  std::vector<Proximity> prox = pc.get_proximities();
  vp.write_file(prox,fname);

  return 0;
}
