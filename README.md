# Money-Management-System

The Money Management System (MMS) is a comprehensive system of tools for balancing cash flow, paying down debt, and predicting future cash flow.

The MMS takes a list of bills and a list of debts and allows the user to run various calculations on this data. 

# Table of Contents:
- Summary
- How to Run MMS on Your Machine
- Features
- Why I Made the MMS
- The Future of MMS


# Summary
# =====================================================
# The Problem:
Almost all bills are scheduled on a MONTHLY basis. Rent may be due on the 1st, the car payment is due on the 15th, etc etc.
Many people (especially low-income individuals) get paid on a WEEKLY basis, either weekly or bi-weekly.
Because of the various oddities of the gregorian calendar, these two things do not align consistently.
Because of this, the amount due from paycheck to paycheck can swing wildly, resulting in feast-and-famine finances that can lead to credit card debt and other issues.

# The Solution:
The MMS compares the bill schedules and the pay schedules, and gives the user a list of what bills are due during each pay period.
By knowing what bills are due when, the user can easily make sure that bills are being paid on time.
The MMS also looks at the total amount due, and the total expected pay.
By knowing how much profit the user has during each pay period, they can more easily make informed financial decisions.
The MMS also attempts to find an amount to put aside for bills every paycheck, to eliminate the feast-and-famine cash flow problem.

# How to Run MMS on Your Machine
# =====================================================
Once you've downloaded this repository, simply find the mms.html file, and open it in a web browser. Because it is currently entirely a front-end web application, there is no server or complicated setup involved.

# Features
# =====================================================
# Track when bills are due
As mentioned above, the MMS creates a list of "what bills are due when", and calculates how much of each paycheck will be going to bills.
# Balance your cash flow
The MMS also attempts to find a balance to cash flow, using three formulas:
    Formula One finds the percentage of annual expenses to annual income, and then finds that percentage of each paycheck.
    Formula Two takes the yearly cost and divides it evenly across the amount of paychecks within a year.
    Forumla Three is the most advanced and most accurate. It looks ahead at all paychecks for the next year, and then finds the bare minimum required to put away for bills for every paycheck in order for that account to never go negative. The account will build up a significant amount, only to be reduced significantly within a few months.

# Track Debts
The MMS also has debt payment tools.
The MMS Debts tab shows some basic information, such as total monthly cost, total balance, and number of current outstanding debts.
It also contains a list of all debts and their associated information, with some sorting capabilities.
The most powerful data point is the "Ratio".
"Ratio" uses a ratio of balance/monthly cost, to find the lowest debt balance with the largest impact on monthly finance.
Essentially, the higher the minimum payment, the higher the impact that eliminating that debt will have on your monthly finances.
However, the lower the balance, the easier the debt is to eliminate. 
There are many debts with high minimum payments, even when they have a very low balance. This allows the user to find the most powerful use of their money.

# Repay Debts and Maximize Your Impact
The most powerful debt tool is the "Calc" tab. Use this tool if you get a large sum of money, and aren't sure what debts to pay off. Let me explain:
The calculator takes an amount, and a buffer amount, as well as an algorithm choice. The buffer can be a useful tool to view plans that are just out of range.
    Ratio uses the impact ratio as described above to pay off as many high-impact debts as it can with the amount given.
    Balance adds cards, from smallest to largest, until it has exhausted all options or runs out of money.
    Reverse Balance does the same as above, but starts with the largest debt that can be paid with the lump sum, and then attempts to fit in as many as it can with the leftovers.
    Minimum Payment starts from the lowest minimum payment, and goes up until it runs out of money. This is usually not useful, but I've included it anyways for the rare cases where it might be.

# Why I Made the MMS
# =====================================================

I made the MMS for my own financial use. My wife and I were doing many of these calculations by hand every couple paychecks, and planning about a month ahead.
We often made mistakes and I knew, as a programmer, that this was a job for a computer.
I originally wrote part of this in Python, but when I started my first job as a web developer, I decided not only would I rewrite this project in a language relevant to my new job, but also that building a Graphical User Interface for this project would be much easier for me if it was a web application.
As I built the MMS, I realized that not only could this software help MY household finances, but that this is a tool that could potentially save MILLIONS of people money, stress, and debt, all around the world.
Now that the MMS is a functional tool for my household, I'm shifting my focus to building it as a web app that can be accessed and used by anyone. My mission is to help people improve their financial situation.

# The Future of MMS
# =====================================================

As I've mentioned above, my goal for MMS is for it to become a tool that can be used by people across the globe to help them get control of their finances.
Given this goal, it makes sense for this to be a web application, where anyone with an internet connection can access it, rather than for it to be on mobile devices, gated off by app stores and software updates that break its functionality.
I also feel this should be open source, so that anyone can contribute to its functionality and we can all work together in helping achieve financial peace for all.

MMS will need to be rewritten from scratch to become a true web app. The data will need to be stored in a database, the front end will need to allow users to login to access their data, and they should have an easy way to add or change bills and debts.
It should also be exportable as a spreadsheet at any time, for any user who may need to run some calculations not included in the app, but who are not programmers.

Because I like Python, I will most likely attempt to rebuild this in Django. However I haven't used Django yet, so that may change depending on how I like it.
I am a front end developer, and do not have much experience with back end technologies. So this may be a challenge.




COPYRIGHT JOSEPH DOHERTY 2022

This software is free to use and change for personal use.
This software IS NOT FREE for any organization to use or sell.
Sale of this software by anyone other than the creator or authorized personnel is strictly forbidden.
If you are an organization who wants to use this software, please contact me.

joseph@doherty.software