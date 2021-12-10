/*
This file contains the prototypes for the vote parser class.
This class performs input and output on files so that
 - It can convert JSON files into a vector of VoteRollItem structs
 - It can convert a vector of Proximity structs into a JSON file
 SAMUEL EBERSOLE
 10.23.21
*/

#ifndef VOTE_PARSER // include guard
#define VOTE_PARSER

#include "proximity-calculator.hpp"
#include <vector>
#include <string>
#include <array>
#include <cmath>
#include <iostream>
#include <fstream>

namespace ld_proximity
{
  class VoteParser
  {
  private:
    // ---- Variables ----
    std::vector<std::string> targets;
    // ---- Private Methods ----
  public:
    // Public Methods
    std::vector<VoteRollItem> read_file(std::string fname);
    bool write_file(std::vector<Proximity> prox, std::string fname);
    // ---- Constructors ----
    VoteParser();
    // ---- Mutators ----
    bool append_targets(std::vector<std::string> t);
    // ---- Accessors ----
    bool in_targets(std::string s);
  };
}

#endif
