#include "proximity-calculator.hpp"
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
  vi_b.vote = 0;

  VoteRollItem vi_c;
  vi_c.matterId = 0000;
  vi_c.repName = "Cosmo Kramer";
  vi_c.vote = -1;

  VoteRollItem vi_d;
  vi_d.matterId = 0000;
  vi_d.repName = "Elaine Benes";
  vi_d.vote = 1;

  VoteRollItem vi_e;
  vi_e.matterId = 0001;
  vi_e.repName = "Elaine Benes";
  vi_e.vote = 1;

  std::vector<VoteRollItem> v;
  v.push_back(vi_a);
  v.push_back(vi_b);
  v.push_back(vi_c);
  v.push_back(vi_d);
  v.push_back(vi_e);

  return v;
}

int main()
{
  std::vector<VoteRollItem> testVoteData = testVoteDataConstructor();
  ProximityCalculator pc = ProximityCalculator(testVoteData);
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Matter ID: " << pc.get_voting_data()[0].matterId << std::endl;
  std::cout << "Rep. Name: " << pc.get_voting_data()[0].repName << std::endl;
  std::cout << "Vote     : " << pc.get_voting_data()[0].vote << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Matter ID: " << pc.get_voting_data()[1].matterId << std::endl;
  std::cout << "Rep. Name: " << pc.get_voting_data()[1].repName << std::endl;
  std::cout << "Vote     : " << pc.get_voting_data()[1].vote << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Matter ID: " << pc.get_voting_data()[2].matterId << std::endl;
  std::cout << "Rep. Name: " << pc.get_voting_data()[2].repName << std::endl;
  std::cout << "Vote     : " << pc.get_voting_data()[2].vote << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Matter ID: " << pc.get_voting_data()[3].matterId << std::endl;
  std::cout << "Rep. Name: " << pc.get_voting_data()[3].repName << std::endl;
  std::cout << "Vote     : " << pc.get_voting_data()[3].vote << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Matter ID: " << pc.get_voting_data()[4].matterId << std::endl;
  std::cout << "Rep. Name: " << pc.get_voting_data()[4].repName << std::endl;
  std::cout << "Vote     : " << pc.get_voting_data()[4].vote << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  bool assignRep = pc.set_rep_x("Cosmo Kramer");
  if (assignRep)
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Successfully assigned Kramer as Rep. X." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  else
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Failed to assign Kramer as Rep. X." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  assignRep = pc.set_rep_y("Cosmo Kramer");
  if (assignRep)
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Successfully assigned Kramer as Rep. Y." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  else
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Failed to assign Kramer as Rep. Y." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  assignRep = pc.set_rep_y("Elaine Benes");
  if (assignRep)
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Successfully assigned Elaine as Rep. Y." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  else
  {
    std::cout << "-----------------------------------------------" << std::endl;
    std::cout << "Failed to assign Elaine as Rep. Y." << std::endl;
    std::cout << "-----------------------------------------------" << std::endl;
  }
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Rep. X: " << pc.get_rep_x() << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Rep. Y: " << pc.get_rep_y() << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Rep. X Votes Size: " << pc.get_rep_x_votes().size() << std::endl;
  std::cout << "Rep. X Votes[0]  : " << pc.get_rep_x_votes()[0][0] << ", " << pc.get_rep_x_votes()[0][1] << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;
  std::cout << "Rep. Y Votes Size: " << pc.get_rep_y_votes().size() << std::endl;
  std::cout << "Rep. Y Votes[0]  : " << pc.get_rep_y_votes()[0][0] << ", " << pc.get_rep_y_votes()[0][1] << std::endl;
  std::cout << "Rep. Y Votes[0]  : " << pc.get_rep_y_votes()[1][0] << ", " << pc.get_rep_y_votes()[1][1] << std::endl;
  std::cout << "-----------------------------------------------" << std::endl;

  return 0;
}
