#include <iostream>
#include <fstream>
#include <string>
using namespace std;

void editInPlace(string ifname, string ofname)
{
  std::cout << "Editing " << ifname << std::endl;
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
        std::cout << line << " > " << nline << std::endl;
        ofile << nline;
      }
      else if (line[line.length() - 1] == ' ')
      {
        while (line[line.length() - 1] == ' ')
        {
          line = line.substr(0,line.length() - 1);
        }
        if (line[line.length() - 1] == '}')
        {
          string nline = line;
          nline += ',';
          std::cout << line << " > " << nline << std::endl;
          ofile << nline;
        }
        else {
          ofile << line;
        }
      }
      else
      {
        //std::cout << line[line.length() - 1] << std::endl;
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
  editInPlace("votes_concat/cat_votes0.json", "votes_concat/cat_cr_votes0.json");
  editInPlace("votes_concat/cat_votes11.json", "votes_concat/cat_cr_votes11.json");
  editInPlace("votes_concat/cat_votes12.json", "votes_concat/cat_cr_votes12.json");
  editInPlace("votes_concat/cat_votes13.json", "votes_concat/cat_cr_votes13.json");
  editInPlace("votes_concat/cat_votes21.json", "votes_concat/cat_cr_votes21.json");
  editInPlace("votes_concat/cat_votes22.json", "votes_concat/cat_cr_votes22.json");
  return 0;
}
