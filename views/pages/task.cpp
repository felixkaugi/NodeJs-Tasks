#include<iostream>
#include<string>
#include<iomanip>
using namespace std;

int main()
{
    float wage, hrs, regular=0.0, over=0.0, bonus=0.0, over_pay, regular_pay, total; 
//wage = hourly pay, hrs = no. of hours worked in a week,  regular = hours works upto 40,  over= overtime hours
//bonus = hours worked more than 60,  over_pay = Pay of overtime, regular_pay = pay of regular time, 
//total = total pay

    string name;  //To store name

    cout<<"Enter your First name and Last name : ";
    getline(cin, name);   //Input name
    cout<<"Enter your hourly rate : ";
    cin>>wage;  //Enter hurly wage
    cout<<"Enter number of hours you worked last week : ";
    cin>>hrs;       //Hours worked in week

    if(hrs<=0)   //if hours is less than or equal to 0.
    {
        cout<<"Didn't work this week. Number of hours must be > 0"<<endl;
       // exit(0);
    }

    if(hrs>40)   //Calculate overtime
    {
        over = hrs-40;
        regular=40.0;
    }
    else
    {
        regular = hrs;
    }

    if(hrs>60)    //calculate bonus
        bonus = wage;


    regular_pay= wage*regular;   //Regular pay calculation
    over_pay = over*wage*1.5;    //Overtime pay calculation
    total = regular_pay + over_pay + bonus;     //Total pay calculation

//Printing the details

    cout<<"\n*************\n"<<endl;
    cout<<"Pay information for "<<name<<endl;
    cout<<"\n*************\n"<<endl;

//setprecision(2)  and 'fixed' are used to print value upto two decimal places.

    cout<<"    Regular Pay: $"<< fixed << setprecision(2) <<regular_pay<<endl;
    cout<<" Overtime hours: "<< fixed << setprecision(2) <<over<<endl;
    cout<<"   Overtime Pay: $"<< fixed << setprecision(2) <<over_pay<<endl;
    cout<<"      Bonus Pay: $"<< fixed << setprecision(2) <<bonus<<endl;
    cout<<"      Total Pay: $"<< fixed<< setprecision(2) <<total<<endl;

    return 0;

}