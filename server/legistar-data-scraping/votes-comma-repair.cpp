#include <iostream>
#include <fstream>
#include <string>
using namespace std;

void editInPlace(string ifname, string ofname)
{
  ifstream ifile;
  ofstream ofile;
  ifile.open(ifname);
  ofile.open(ofname);
  string line;
  if (ifile.is_open() && ofile.is_open())
  {
    while (getline(ifile, line))
    {
      if (line[line.length() - 1] == '}')
      {
        string nline = line;
        nline += ',';
        ofile << nline;
      }
      else
      {
        ofile << line;
      }
      ofile << '\n';
    }
  }
  ifile.close();
  ofile.close();
}

int main()
{
  editInPlace("votes/cat_votes1.json", "votes/rep_cat_votes1.json");
  editInPlace("votes/cat_votes2.json", "votes/rep_cat_votes2.json");
  editInPlace("votes/cat_votes8.json", "votes/rep_cat_votes8.json");
  editInPlace("votes/cat_votes9.json", "votes/rep_cat_votes9.json");
  return 0;
}
