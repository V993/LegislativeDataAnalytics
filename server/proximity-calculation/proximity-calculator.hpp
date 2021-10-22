/*
This file contains the prototypes for the proximity calculator class.
This class can perform all calculations needed to create a proximity
graph for representatives, given properly formatted data.
SAMUEL EBERSOLE
10.22.21
*/

#ifndef PROXIMITY_CALCULATOR // include guard
#define PROXIMITY_CALCULATOR

#include <vector>
#include <string>
#include <array>

namespace ld_proximity
{
  struct VoteRollItem
  {
    int matterId;
    std::string repName;
    int vote;
  };

  struct Proximity
  {
    std::string repName;
    double x;
    double y;
  };

  class ProximityCalculator
  {
  private:
    // ---- Variables ----
    // VotingData : array of size 3 arrays [Matter ID, Representative Name, Vote] w/ all recorded votes
    std::vector<VoteRollItem> votingData;
    // RepresentativeXName : string "Firstname Lastname" for Representative X
    std::string representativeXName;
    // RepresentativeXVotes : array of size 2 arrays [Matter ID, Vote] for Representative X
    std::vector<std::array<int,2>> representativeXVotes;
    // RepresentativeYName : string "Firstname Lastname" for Representative Y
    std::string representativeYName;
    // RepresentativeYVotes : array of size 2 arrays [Matter ID, Vote] for Representative Y
    std::vector<std::array<int,2>> representativeYVotes;
    // Proximities : array of size 3 arrays [Representative Name, Distance X, Distance Y] w/ all reps. being compared to X and Y
    std::vector<Proximity> proximities;

    // ---- Private Methods ----
    void calc_rep_x();
    void calc_rep_y();

  public:
    // ---- Constructors ----
    // Create empty ProximityCalculator
    ProximityCalculator();
    // Create ProximityCalculator with votingData
    ProximityCalculator(std::vector<VoteRollItem> vd);
    // Create ProximityCalculator with votingData and representativeXName
    ProximityCalculator(std::vector<VoteRollItem> vd, std::string rxn);
    // Create ProximityCalculator with votingData and representativeXName and representativeYName
    ProximityCalculator(std::vector<VoteRollItem> vd, std::string rxn, std::string ryn);

    // ---- Mutators ----

    // ---- ---- votingData Mutators ----
    // Sets votingData = vd
    // Returns true as long as vd is not empty
    bool set_voting_data(std::vector<VoteRollItem> vd);
    // Calls push_voting_data() on all items in vd
    // Returns true if any are pushed, otherwise false
    bool append_voting_data(std::vector<VoteRollItem> vd);
    // Appends vi to votingData, provided vi isn't already in votingData
    // Returns false if vi already in votingData, otherwise true
    bool push_voting_data(VoteRollItem vi);

    // ---- ---- representativeX Mutators
    // Sets representativeXName = n, provided that
    // n is equal to some name in votingData and
    // n is not equal to representativeYName
    bool set_rep_x(std::string n);
    // Sets representativeYName = n, provided that
    // n is equal to some name in votingData and
    // n is not equal to representativeXName
    bool set_rep_y(std::string n);

    // ---- Accessors ----
    std::vector<VoteRollItem> get_voting_data();
    std::string get_rep_x();
    std::string get_rep_y();
    std::vector<std::array<int,2>> get_rep_x_votes();
    std::vector<std::array<int,2>> get_rep_y_votes();
    std::vector<Proximity> get_proximities();
    bool voting_data_contains(int m);
    bool voting_data_contains(std::string n);

  };
}

#endif
