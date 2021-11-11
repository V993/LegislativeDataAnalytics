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

int main()
{
  // Parse input
  std::cout << "called main()" << std::endl;
  VoteParser vp;
  std::cout << "Created VoteParser" << std::endl;
  std::vector<VoteRollItem> testVoteData = vp.read_file("./test_vote_data.json");
  std::cout << "VoteParser has completed read_file()" << std::endl;
  for (int i = 0; i < testVoteData.size(); i++)
  {
    std::cout << "{" << std::endl;
    std::cout << "\t repname: " << testVoteData[i].repName << std::endl;
    std::cout << "}" << std::endl;
  }

  // Calculate proximities
  bool done = false;
  ProximityCalculator pc = ProximityCalculator(testVoteData);

  std::vector<std::string> alreadyCalculatedX;
  std::vector<std::string> alreadyCalculatedY;

  // Set initial reps
  pc.set_rep_x(testVoteData[0].repName);
  while (pc.get_rep_y().length() == 0)
  {
    for (int i = 0; i < testVoteData.size(); i++)
    {
      if (testVoteData[i].repName != pc.get_rep_x())
      {
        pc.set_rep_y(testVoteData[i].repName);
        break;
      }
    }
  }
  alreadyCalculatedX.push_back(pc.get_rep_x());
  alreadyCalculatedY.push_back(pc.get_rep_x());
  alreadyCalculatedY.push_back(pc.get_rep_y());

  std::cout << pc.get_rep_x() << " " << pc.get_rep_y() << std::endl;
  std::vector<Proximity> prox = pc.get_proximities();
  vp.write_file(prox,"responses/" + underscoreSpaces(pc.get_rep_x()) + "_" + underscoreSpaces(pc.get_rep_y()) + ".json");
  for (int i = 0; i < testVoteData.size(); i++)
  {
    // Loop through all Y values
    for (int j = 0; j < testVoteData.size(); j++)
    {
      if (unused(alreadyCalculatedY, testVoteData[j].repName))
      {
        pc.set_rep_y(testVoteData[j].repName);
        alreadyCalculatedY.push_back(testVoteData[j].repName);
        std::cout << pc.get_rep_x() << " " << pc.get_rep_y() << std::endl;
        std::vector<Proximity> prox = pc.get_proximities();
        vp.write_file(prox,"responses/" + underscoreSpaces(pc.get_rep_x()) + "_" + underscoreSpaces(pc.get_rep_y()) + ".json");
      }
    }
    // Go to next valid X value
    if (unused(alreadyCalculatedX,testVoteData[i].repName))
    {
      pc.set_rep_x(testVoteData[i].repName);
      alreadyCalculatedX.push_back(pc.get_rep_x());
      alreadyCalculatedY.clear();
      alreadyCalculatedY.push_back(pc.get_rep_x());
    }
  }

  /*
  // Set inital reps
  pc.set_rep_x(testVoteData[0].repName);
  //pc.set_rep_y(testVoteData[0].repName);
  alreadyCalculated.push_back(pc.get_rep_x());
  // Calculate proximities for every rep combination
  while(alreadyCalculated.size() < testVoteData.size())
  {
    std::cout << "Reps X and Y : " << pc.get_rep_x() << " " << pc.get_rep_y() << std::endl;
    // Iterate through testVoteData to find name not used as axis
    for (int i = 0; i < testVoteData.size(); i++)
    {
      if (unused(alreadyCalculated, testVoteData[i].repName))
      {
        bool set = pc.set_rep_y(testVoteData[i].repName);
        if (!set) { return 0; }
        else { i = testVoteData.size(); }
      }
    }
    if (pc.get_rep_x() == pc.get_rep_y())
    {
      return 0;
    }
    else
    {
      std::vector<Proximity> prox = pc.get_proximities();
      //vp.write_file(prox,"responses/" + pc.get_rep_x() + "_" + pc.get_rep_y() + ".json");
      alreadyCalculated.push_back(pc.get_rep_x());
      std::string nx = pc.get_rep_y();
      pc.set_rep_y("");
      pc.set_rep_x(nx);
    }
  }
  */
  //std::vector<Proximity> prox = pc.get_proximities();

  // Write output
  //vp.write_file(prox,"responses/out.json");

  return 0;
}
