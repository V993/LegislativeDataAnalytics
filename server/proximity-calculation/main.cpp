#include "proximity-calculator.hpp"
#include "vote-parser.hpp"
#include <string>
#include <vector>
#include <iostream>
using namespace ld_proximity;

std::vector<VoteRollItem> testVoteDataConstructor()
{
  VoteRollItem vi_a;
  vi_a.matterId = 0000;
  vi_a.repName = "George Constanza";
  vi_a.vote = 1;

  VoteRollItem vi_b;
  vi_b.matterId = 0000;
  vi_b.repName = "Jerry Seinfeld";
  vi_b.vote = -1;

  VoteRollItem vi_c;
  vi_c.matterId = 0000;
  vi_c.repName = "Cosmo Kramer";
  vi_c.vote = 1;

  VoteRollItem vi_d;
  vi_d.matterId = 0000;
  vi_d.repName = "Elaine Benes";
  vi_d.vote = 1;

  VoteRollItem vi_e;
  vi_e.matterId = 0001;
  vi_e.repName = "Cosmo Kramer";
  vi_e.vote = 0;

  VoteRollItem vi_f;
  vi_f.matterId = 0001;
  vi_f.repName = "George Constanza";
  vi_f.vote = 0;

  VoteRollItem vi_g;
  vi_g.matterId = 0002;
  vi_g.repName = "Cosmo Kramer";
  vi_g.vote = -1;

  VoteRollItem vi_h;
  vi_h.matterId = 0002;
  vi_h.repName = "George Constanza";
  vi_h.vote = -1;

  VoteRollItem vi_i;
  vi_i.matterId = 0001;
  vi_i.repName = "Jerry Seinfeld";
  vi_i.vote = 0;

  VoteRollItem vi_j;
  vi_j.matterId = 0002;
  vi_j.repName = "Jerry Seinfeld";
  vi_j.vote = 1;

  VoteRollItem vi_k;
  vi_k.matterId = 0003;
  vi_k.repName = "Cosmo Kramer";
  vi_k.vote = 1;

  VoteRollItem vi_l;
  vi_l.matterId = 0003;
  vi_l.repName = "George Constanza";
  vi_l.vote = -1;

  std::vector<VoteRollItem> v;
  v.push_back(vi_a);
  v.push_back(vi_b);
  v.push_back(vi_c);
  v.push_back(vi_d);
  v.push_back(vi_e);
  v.push_back(vi_f);
  v.push_back(vi_g);
  v.push_back(vi_h);
  v.push_back(vi_i);
  v.push_back(vi_j);
  v.push_back(vi_k);
  v.push_back(vi_l);

  return v;
}

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

int main()
{
  // Parse input
  std::cout << "called main()" << std::endl;
  VoteParser vp;
  std::cout << "Created VoteParser" << std::endl;
  std::vector<VoteRollItem> testVoteData = vp.read_file("calls/data.json");
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
  vp.write_file(prox,"responses/" + pc.get_rep_x() + "_" + pc.get_rep_y() + ".json");
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
        vp.write_file(prox,"responses/" + pc.get_rep_x() + "_" + pc.get_rep_y() + ".json");
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
