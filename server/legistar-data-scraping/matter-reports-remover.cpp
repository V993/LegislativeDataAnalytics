#include <string>
#include <iostream>
#include <fstream>
using namespace std;

void ah(string iname, string oname) {
  string line;
  ifstream ifile;
  bool in_block = false;
  ofstream ofile;
  ifile.open(iname);
  ofile.open(oname);

  if (ifile.is_open())
  {
    while (getline(ifile, line))
    {
      if (line.find("MatterReports") == string::npos)
      {
        ofile << line << '\n';
      }
    }
  }

  ifile.close();
  ofile.close();
}

int main() {
  ah("matters/cat_matters0.json","matters/ncat_matters0.json");
  ah("matters/cat_matters1.json","matters/ncat_matters1.json");
  ah("matters/cat_matters2.json","matters/ncat_matters2.json");
  ah("matters/cat_matters3.json","matters/ncat_matters3.json");
  ah("matters/cat_matters4.json","matters/ncat_matters4.json");

  return 0;
}
