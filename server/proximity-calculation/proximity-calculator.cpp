/*
Implements the methods prototyped in proximity-calculator.hpp
SAMUEL EBERSOLE
10.22.21
*/

#include "proximity-calculator.hpp"
using namespace ld_proximity;

// ---- Private Methods ----
// Calculate representativeXVotes
void ProximityCalculator::calc_rep_x()
{
  representativeXVotes.clear();
  for (int i = 0; i < votingData.size(); i++)
  {
    if (votingData[i].repName == representativeXName)
    {
      representativeXVotes.push_back({votingData[i].matterId, votingData[i].vote});
    }
  }
}
// Calculate representativeYVotes
void ProximityCalculator::calc_rep_y()
{
  representativeYVotes.clear();
  for (int i = 0; i < votingData.size(); i++)
  {
    if (votingData[i].repName == representativeYName)
    {
      representativeYVotes.push_back({votingData[i].matterId, votingData[i].vote});
    }
  }
}

// ---- Constructors ----
// Create empty ProximityCalculator
ProximityCalculator::ProximityCalculator()
{

}

// Create ProximityCalculator with votingData
ProximityCalculator::ProximityCalculator(std::vector<VoteRollItem> vd)
{
  set_voting_data(vd);
}

// Create ProximityCalculator with votingData and representativeXName
ProximityCalculator::ProximityCalculator(std::vector<VoteRollItem> vd, std::string rxn)
{
 set_voting_data(vd);
 set_rep_x(rxn);
}

// Create ProximityCalculator with votingData and representativeXName and representativeYName
ProximityCalculator::ProximityCalculator(std::vector<VoteRollItem> vd, std::string rxn, std::string ryn)
{
  set_voting_data(vd);
  set_rep_x(rxn);
  set_rep_y(ryn);
}

// ---- Mutators ----
// Sets votingData = vd
bool ProximityCalculator::set_voting_data(std::vector<VoteRollItem> vd)
{
    votingData.clear();
    return append_voting_data(vd);
}

// Appends vd to votingData
bool ProximityCalculator::append_voting_data(std::vector<VoteRollItem> vd)
{
  bool any_true = false;
  for (int i = 0; i < vd.size(); i++)
  {
    bool p = push_voting_data(vd[i]);
    if (p == true)
    {
      any_true = true;
    }
  }
  return any_true;
}

// Appends vi to votingData
bool ProximityCalculator::push_voting_data(VoteRollItem vi)
{
  for (int i = 0; i < votingData.size(); i++)
  {
    if (votingData[i].matterId == vi.matterId && votingData[i].repName == vi.repName)
    {
      return false;
    }
  }
  votingData.push_back(vi);
  return true;
}

// Sets representativeXName and representativeXVotes
bool ProximityCalculator::set_rep_x(std::string n)
{
  // Guards
  if (n == representativeXName) { return true; }
  if (n == representativeYName) { return false; }
  if (!voting_data_contains(n)) { return false; }
  representativeXName = n;
  calc_rep_x();
  return true;
}

// Sets representativeYName and representativeYVotes
bool ProximityCalculator::set_rep_y(std::string n)
{
  // Guards
  if (n == representativeYName) { return true; }
  if (n == representativeXName) { return false; }
  if (!voting_data_contains(n)) { return false; }
  representativeYName = n;
  calc_rep_y();
  return true;
}


// ---- Accessors ----
std::vector<VoteRollItem> ProximityCalculator::get_voting_data() { return votingData; }
std::string ProximityCalculator::get_rep_x() { return representativeXName; }
std::string ProximityCalculator::get_rep_y() { return representativeYName; }
std::vector<std::array<int,2>> ProximityCalculator::get_rep_x_votes() { return representativeXVotes; }
std::vector<std::array<int,2>> ProximityCalculator::get_rep_y_votes() { return representativeYVotes; }
//std::vector<Proximity> ProximityCalculator::get_proximities();
bool ProximityCalculator::voting_data_contains(int m)
{
  for (int i = 0; i < votingData.size(); i++)
  {
    if (votingData[i].matterId == m) { return true; }
  }
  return false;
}
bool ProximityCalculator::voting_data_contains(std::string n)
{
  for (int i = 0; i < votingData.size(); i++)
  {
    if (votingData[i].repName == n) { return true; }
  }
  return false;
}
