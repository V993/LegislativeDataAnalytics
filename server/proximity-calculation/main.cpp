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

int main()
{
  std::vector<VoteRollItem> testVoteData = testVoteDataConstructor();
  ProximityCalculator pc = ProximityCalculator(testVoteData);
  bool assignRep = pc.set_rep_x("Cosmo Kramer");
  assignRep = pc.set_rep_y("Cosmo Kramer");
  assignRep = pc.set_rep_y("Elaine Benes");
  std::vector<Proximity> prox = pc.get_proximities();
  for (int i = 0; i < prox.size(); i++)
  {
    std::cout << "--------------------------------" << std::endl;
    std::cout << prox[i].repName << ": (" << prox[i].x << ", " << prox[i].y << ")" << std::endl;
    std::cout << "--------------------------------" << std::endl;
  }

  return 0;
}
