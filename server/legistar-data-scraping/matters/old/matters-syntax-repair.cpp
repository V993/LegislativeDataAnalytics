#include <iostream>
#include <fstream>
#include <string>
using namespace std;

void repair (string ifname, string ofname)
{
  bool within_block = false;

  string line;
  ifstream ifile;
  ofstream ofile;
  ifile.open(ifname);
  ofile.open(ofname);
  if (ifile.is_open() && ofile.is_open())
  {
    while (getline (ifile, line))
    {
      cout << line << endl;

      // Check if within MatterNotes
      if (line.find("MatterNotes") != string::npos) { within_block = true; }
      if (line.find("MatterVersion") != string::npos) { within_block = false; /*ofile << "\n";*/ }

      if (within_block)
      {
        string nline = "";
        //for (int i = 0; i < line.length(); i++)
        //{
        //  if (line[i] != '\n') { nline += line[i]; }
        //}
        cout << nline << endl;
        ofile << nline;
      }
      else
      {
        ofile << line + '\n';
      }
    }
  }
  ifile.close();
  ofile.close();
}

int main () {
  repair("matters/matters_1.json", "matters/nrev_matters_1.json");
  repair("matters/matters_2.json", "matters/nrev_matters_2.json");
  repair("matters/matters_3.json", "matters/nrev_matters_3.json");
  repair("matters/matters_4.json", "matters/nrev_matters_4.json");
}
