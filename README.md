This Exam Coding Assignment is worth 30% of Final CS230 Examination Mark.

This is an open-book, graded examination coding assignment. You may use online resources for reference purposes only to help with the examination assignment. Please cite all references as comments in your submissions. You cannot directly reuse HTML/CSS/JS **solution code** from online sources. **You must not engage with another student, in person or electronically (phone, social media, etc.) to secure assistance with this assignment. If you do so you will receive an automatic fail (0%)**. We will perform similarity checks on submitted assignments to check for collaborative efforts. A reasonable attempt at this assignment will gain you 30% of your final CS230 Examination Mark.

**Coding Examination-Develop a Database, a REST API, and a User Interface (UI)** 

You are required to develop a solution for this coding assignment in three components:

(a) A solution database which appropriately models the data required for the coding assignment. The solution database may be implemented using either MySQL or MongoDB.

(b) A solution REST API that provides CRUD functionality for interacting with the solution database. The API may be implemented using PHP or NodeJS/Express.

(c)A User Interface (UI) which demonstrates (i) consumption of the REST API and (ii) implements the requested functionality detailed in the assignment brief that follows. You may implement your UI using PHP, or using ExpressJS in conjunction with a templating engine of your choosing.

Note that you do not have to use the same programming language throughout. It is perfectly acceptable to use PHP, say, to implement the UI and NodeJS/ExpressJS to implement the REST API, or vice versa. Or you may choose to develop an entirely PHP solution, It is important, however, that there is a clear separation between the REST API and the UI that consumes the API,

Components (a), (b) and (c) are equally weighted at 10% for a fully functioning solution. You may decide to focus on one, two or three components. However, an important constraint for this assignment is that the components must be interoperable (work together) in order to secure maximum marks. Fully functional, standalone components will not receive 10%; they will receive 5% maximum, with the remaining 5% allocated to functioning correctly in a complete solution context.

**Coding Examination-Requirements**

You are required to develop a solution that implements a prototype Client-Therapist Session Management System for a hypothetical Psychotherapy and Counselling Service. Your solution should provide a fully working UI (user Interface), REST API and DB (database) for the required functionality outlined below.

Your solution should support the creation and management of "Therapist" and "Client" personal information, together with support for the creation and management of "Therapy Session" information. In terms of background, a "Therapy Session" (or "session") is the process of a client meeting with a therapist to resolve problematic behaviours, beliefs, feelings, relationship issues, and/or somatic responses (sensations in the body). Therapists usually record notes following therapy sessions, and your solution should provide functionality to record who was present in the session (one or more clients and a single therapist), session details, and the session notes.

For **Clients and Therapists** your solution should manage the following personal information: 

1. Core Personal Details, for both Therapists and Clients, including:
Title* with options [Mx, Ms, Mr, Mrs, Miss, Dr or Other (specify)], First Name(s)*, Surname(s)*, Phone Number*, Email Address*, and Home Address* [Address Line 1*, Address Line 2*, Town*, County/City*, EIRCODE]. When "Other (specify)" is selected, the form should provide a text-input field to record the user input for this detail. **The fields marked * are required fields, i.e.they must contain values. You must validate forms prior to submission.**

2. Additional Personal Details, for Clients only,including:
Date of Birth*, Parent/Guardian Name if under 18*, Permission to leave message by Phone or Email*[Y/N], Gender*, Marital Status* with options [Never Married, Domestic Partnership, Married, Separated, Divorced, Widowed], and Referrer (ie. the name of the referrer, e.g. doctor, work, etc.; a general string field is appropriate here). Your solution should also automatically record the Date for Client Record Creation. **The fields marked * are required fields,i.e. they must contain values. You must validate forms prior to submission.**

For **Therapy Sessions(sessions)**, your solution manages the following session information:

3. Session Date*, Session Time*， Client(s)*, Therapist*，Fee (€)", Session Number*，
Session Attendance* with options [Attended, Cancelled, No Show], Session Type* with options [Intake, Psychotherapy, Assessment, Other(specify)], and Session Notes*. When "Other(specify)" is selected the form should provide a text-input field to
record the user input for this detail. You may record "Gender" using your personal preferred approach,i.e.as free text or using a list of your preferred options. **The fields marked * are required fields,i.e. they must contain values. You must validate forms prior to submission.**

4. There will be at least one client in attendance per session, with a maximum of three clients permissible. There will only be one therapist in attendance. For "Session Notes", you need to accommodate text notes only. Your solution is not required to provide a document upload facility.


5. As Clients normally typically attend several sessions the session number is important. Your solution is not required to automatically calculate the current session number. This can be set manually using the online form. 

Your solution's RESTful API(for example, created using PHP or NodeJS/ExpressJS/etc.) should provide CRUD functionality for Creating, Searching(Retrieving), Updating, and Deleting clients, therapists, and sessions information stored in either a MySQL or MongoDB database using online forms consuming the REST API.

You may implement your User Interface using HTML/CSS/JS, PHP, or using ExpressJS in conjunction with a templating engine of your choosing. User Interface solutions may use jQuery and Bootstrap. Docker solutions are not permitted. Solutions realised using AngularJS orReactlS, must provide detailed working (and tested) setup instructions with the submission, or it will not be possible to test; grading will then be based on a code review only.

**Coding Examination - Additional Notes**

(i) Please note that you should implement best practices when it comes to database design for this assignment,i.e., you may choose to have normalised or de-normalised models, or a combination approach depending on your choice of database management system (MySQL or MongoDB).

(ii) If you are using MySQL for storage your solution **must** use the Computer Science Department **Webcourse** service (https://webcourse.cs.nuim.ie). If you are using MongoDB for storage your solution must use the **Atlas Cloud** service (https://www.mongodb.com/atlas/database).

(iii) You may write, or reuse, previously personally developed functions to randomly create personal and address data; for speed, it may be appropriate to use the NodeJS package, faker.js, as shown in Lecture 24 Lesson 02. **Your solution should include complete personal data for, at least six therapists, at least ten clients, and at least twelve sessions**.


(iv) Your code should include a brief description of the database design (your data modelling approach) and the Impact on your REST API development. This should be included as a comment at the bottom of your REST API code submission.

(v) For this examination coding assignment your solution should **validate data** in both the User Interface and the REST API in order to secure maximum marks.

(vi) For this examination coding assignment you must generate online forms to collect and validate data sent to the database via a REST API. Please include an example of sample routes as a comment at the bottom of your Ul code submission. Your solution should use styled tables, etc. to display retrieved data.

(vii)Your solution must "hard-code" your database authentication details into your application (in the App or in a loaded file). If you are using the MongoDB Cloud Atlas database hosting service you must allow access from anywhere(whitelist 0.0.0.0). It will be necessary to access to your database in order to correct your assignment. **Please note that you must use a remotely accessible database for this examination. If it is not possible to access your database you will not be awarded marks for this part of the coding assignment. As a backup, please extract and include your database with your submission. Do not use a locally hosted database for this assignment.** 

Please note that there are many sample (JS, PHP)solutions for implementing similar solutions, using REST functionality, available online. While it is fine to consult these, and accompanying articles, for references, you may not re-use code from these projects. Please **cite your reference sources** in your codebase. We will search and identify online coding solutions to similar problems for the purposes of checking against submitted solutions in instances where we have concerns about code originality. It is fine to reuse your earlier assginment code, but not the working code submitted previously by peers. We will consult earlier assignments if we have concerns about plagiarism.

**IMPORTANT SUBMISSION DETAILS**

**Before submitting your coding assignment, students should check that their solution works in Chrome and/or Firefox. Please indicate the Browser, Operating System (Linux/Windows/MacOS) and Browser version used for testing (as a comment in your submitted code).**

All work must be submitted via the upload link provided in Moodle (E: CS230[A]). Work submitted via other means will only be accepted by prior arrangement with John Keating. All work MUST be submitted by the due date deadline. Late submissions will not be accepted.

The assignment submission is a document named **"summer-exam-coding-assignment-zip"** (containing your solution files together with any other resources used in the assignment solution). Please include a dump of the data from your database (as a text file) named **"database.txt"**. Please ensure that all external files use relatively directory referencing,  rather than 
 hard-coding the files' location. And ensure that you include your subdirectory files. **Do not include the node-modules directory.**