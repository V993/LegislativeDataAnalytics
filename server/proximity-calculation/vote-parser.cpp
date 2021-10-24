/*
Implements the methods prototyped in vote-parser.hpp
SAMUEL EBERSOLE
10.23.21
*/

#include "vote-parser.hpp"
using namespace ld_proximity;

std::vector<VoteRollItem> VoteParser::read_file(std::string fname)
{
  std::ifstream ifile;
  ifile.open(fname);
  std::vector<VoteRollItem> v;
  if (ifile.is_open())
  {
    // PARSE FILE
  }
  return v;
}

bool VoteParser::write_file(std::vector<Proximity> prox, std::string fname)
{
  if (prox.size() == 0) { return false; }
  std::ofstream ofile;
  ofile.open(fname);
  if (ofile.is_open())
  {
    ofile << "[" << std::endl;
    for (int i = 0; i < prox.size(); i++)
    {
      ofile << "\t{" << std::endl;
      ofile << "\t\t" << '"' << "repName" << '"' << ": " << prox[0].repName << std::endl;
      ofile << "\t\t" << '"' << "x" << '"' << ": " << prox[0].x << std::endl;
      ofile << "\t\t" << '"' << "y" << '"' << ": " << prox[0].y << std::endl;
      ofile << "\t}" << std::endl;
    }
    ofile << "]" << std::endl;
  }
  ofile.close();
  return true;
}
