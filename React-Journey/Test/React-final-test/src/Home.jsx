import React from 'react'

const Home = () => {
  const companies = [
    {
      id: 1,
      companyName: "Tech Solutions",
      departments: [
        {
          id: 101,
          departmentName: "Development",

          employees: [
            {
              id: 1001,
              name: "Rahul Sharma",
              designation: "Frontend Developer",

              projects: [
                {
                  id: 5001,
                  projectName: "E-Commerce App",

                  clients: [
                    {
                      id: 9001,
                      name: "Amazon India",

                      tasks: [
                        {
                          id: 1,
                          title: "Create Login Page",
                          status: "Completed",
                        },
                        {
                          id: 2,
                          title: "Add Cart Feature",
                          status: "Pending",
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            {
              id: 1002,
              name: "Amit Verma",
              designation: "Backend Developer",

              projects: [
                {
                  id: 5002,
                  projectName: "Banking API",

                  clients: [
                    {
                      id: 9002,
                      name: "HDFC Bank",

                      tasks: [
                        {
                          id: 3,
                          title: "Create Auth API",
                          status: "Completed",
                        },
                        {
                          id: 4,
                          title: "Transaction API",
                          status: "In Progress",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          id: 102,
          departmentName: "HR",

          employees: [
            {
              id: 1003,
              name: "Priya Singh",
              designation: "HR Manager",

              recruitment: [
                {
                  id: 7001,
                  position: "React Developer",
                  candidates: [
                    {
                      id: 8001,
                      name: "Rohit",
                      status: "Selected",
                    },
                    {
                      id: 8002,
                      name: "Anjali",
                      status: "Interview",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      id: 2,
      companyName: "Global Infosys",

      departments: [
        {
          id: 103,
          departmentName: "Testing",

          employees: [
            {
              id: 1004,
              name: "Suresh Kumar",

              projects: [
                {
                  id: 5003,
                  projectName: "Healthcare Portal",

                  clients: [
                    {
                      id: 9003,
                      name: "Apollo Hospital",

                      tasks: [
                        {
                          id: 5,
                          title: "UI Testing",
                          status: "Completed",
                        },
                        {
                          id: 6,
                          title: "API Testing",
                          status: "Pending",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    
    <div>
      home
    </div>
  )
}

export default Home
