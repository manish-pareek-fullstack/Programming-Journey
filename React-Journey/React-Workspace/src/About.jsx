import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
// import { setaboutdata } from "./slice/slicesignup";

const About = () => {
  const dispatch = useDispatch();
 
  const [state, setstate] = useState("");
 
  
  const [collage, setcollage] = useState("");
  // const [collagename, setnamecollage] = useState("");
  const [course, setcourse] = useState("");
  const [branch, setbranch] = useState("");
  const [sections, setsections] = useState("");
  const [sectionsskill, setsectionsskill] = useState("");
  const [search, setsearch] = useState("");
  const location = useLocation();
  console.log('location',location)
  const phoneData = {
    Apple: {
      iPhone: {
        Pro: {
          models: [
            "iPhone 15 Pro",
            "iPhone 15 Pro Max",
            "iPhone 14 Pro",
            "iPhone 13 Pro",
          ],
        },
        Standard: {
          models: ["iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12"],
        },
      },
    },

    Samsung: {
      Galaxy: {
        SSeries: {
          models: ["S24 Ultra", "S24+", "S23 Ultra", "S22"],
        },
        ASeries: {
          models: ["A54", "A34", "A14", "A73"],
        },
      },
    },

    OnePlus: {
      Nord: {
        Series: {
          models: ["Nord 3", "Nord CE 3", "Nord CE 2", "Nord 2"],
        },
      },
      Flagship: {
        Series: {
          models: ["OnePlus 12", "OnePlus 11", "OnePlus 10", "OnePlus 9"],
        },
      },
    },

    Xiaomi: {
      Redmi: {
        Note: {
          models: ["Note 13 Pro", "Note 12 Pro", "Note 11", "Note 10"],
        },
        Mi: {
          models: ["Mi 13", "Mi 12", "Mi 11", "Mi 10"],
        },
      },
    },
  };
  // const [dataprint, setprint] = useState("");
  const collegeData = {
    Haryana: {
      colleges: {
        GJU: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["DSA", "DBMS", "OS", "CN", "React"],
                    B: ["Node", "MongoDB", "SQL", "Java", "Python"],
                    C: ["AI", "ML", "Cloud", "DevOps", "Testing"],
                  },
                },
                IT: {
                  sections: {
                    A: ["HTML", "CSS", "JS", "React", "Node"],
                    B: ["Java", "Spring", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "OS", "CN", "AWS", "Docker"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Thermo", "CAD", "Fluid", "Machine", "Design"],
                    B: ["Robotics", "AutoCAD", "Welding", "CNC", "Tool"],
                    C: ["Heat", "Strength", "Production", "Workshop", "Viva"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Accounts", "Tax", "Audit", "Investment", "Economics"],
                    B: ["Banking", "Budget", "Payroll", "GST", "Excel"],
                    C: ["Business", "Risk", "Market", "Funds", "Research"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["SEO", "Ads", "Branding", "Sales", "Digital"],
                    B: ["Market", "CRM", "Lead", "Email", "Campaign"],
                    C: ["Growth", "Social", "Content", "Analytics", "PR"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Hiring", "Payroll", "Policy", "Training", "Law"],
                    B: ["Onboarding", "Attendance", "Leave", "Review", "KPI"],
                    C: ["Culture", "Benefits", "Engagement", "Exit", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "C++", "Java", "DBMS", "HTML"],
                    B: ["CSS", "JS", "React", "Node", "MongoDB"],
                    C: ["DSA", "OS", "CN", "Python", "Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["Python", "ML", "DL", "NLP", "Vision"],
                    B: ["TensorFlow", "Pandas", "NumPy", "Stats", "Model"],
                    C: ["GenAI", "LLM", "Prompt", "RAG", "Agents"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "Pandas", "SQL", "PowerBI", "Excel"],
                    B: ["ML", "Stats", "EDA", "Cleaning", "Model"],
                    C: ["Dashboard", "Viz", "NLP", "BigData", "Project"],
                  },
                },
              },
            },
          },
        },

        MDU: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["Java", "React", "Node", "MongoDB", "Redis"],
                    B: ["Express", "SQL", "AWS", "Docker", "CI/CD"],
                    C: ["Microservices", "Kafka", "System Design", "DSA", "OS"],
                  },
                },
                IT: {
                  sections: {
                    A: ["Web", "API", "Cloud", "Security", "Linux"],
                    B: ["Python", "Django", "FastAPI", "Postgres", "Redis"],
                    C: ["K8s", "DevOps", "Jenkins", "Git", "Project"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Machine", "Workshop", "CAD", "CAM", "Design"],
                    B: ["Engine", "Hydraulic", "Fluid", "Thermo", "CNC"],
                    C: ["Robotics", "Tool", "Heat", "Material", "Project"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Budget", "Tax", "Audit", "Accounts", "Funds"],
                    B: ["Stock", "Equity", "Risk", "Research", "Excel"],
                    C: ["Banking", "Loans", "Insurance", "Portfolio", "GST"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["Brand", "SEO", "SEM", "Sales", "Lead"],
                    B: ["Campaign", "CRM", "Social", "Email", "Analytics"],
                    C: ["Growth", "PR", "Market", "Research", "Strategy"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Recruitment", "Payroll", "Training", "Review", "KPI"],
                    B: ["Policy", "Attendance", "Leave", "Law", "Benefits"],
                    C: ["Culture", "Engagement", "Exit", "Survey", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "Java", "HTML", "CSS", "JS"],
                    B: ["React", "Node", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "Python", "OS", "CN", "Mini Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["ML", "DL", "NLP", "Vision", "Python"],
                    B: ["Stats", "Model", "TensorFlow", "Pandas", "NumPy"],
                    C: ["Prompt", "LLM", "Agents", "RAG", "Project"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "SQL", "Pandas", "Excel", "PowerBI"],
                    B: ["EDA", "ML", "Viz", "Dashboard", "BigData"],
                    C: ["NLP", "Forecast", "Cleaning", "Model", "Project"],
                  },
                },
              },
            },
          },
        },
      },
    },
    Rajasthan: {
      colleges: {
        JECRC: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["DSA", "DBMS", "OS", "CN", "React"],
                    B: ["Node", "MongoDB", "SQL", "Java", "Python"],
                    C: ["AI", "ML", "Cloud", "DevOps", "Testing"],
                  },
                },
                IT: {
                  sections: {
                    A: ["HTML", "CSS", "JS", "React", "Node"],
                    B: ["Java", "Spring", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "OS", "CN", "AWS", "Docker"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Thermo", "CAD", "Fluid", "Machine", "Design"],
                    B: ["Robotics", "AutoCAD", "Welding", "CNC", "Tool"],
                    C: ["Heat", "Strength", "Production", "Workshop", "Viva"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Accounts", "Tax", "Audit", "Investment", "Economics"],
                    B: ["Banking", "Budget", "Payroll", "GST", "Excel"],
                    C: ["Business", "Risk", "Market", "Funds", "Research"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["SEO", "Ads", "Branding", "Sales", "Digital"],
                    B: ["Market", "CRM", "Lead", "Email", "Campaign"],
                    C: ["Growth", "Social", "Content", "Analytics", "PR"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Hiring", "Payroll", "Policy", "Training", "Law"],
                    B: ["Onboarding", "Attendance", "Leave", "Review", "KPI"],
                    C: ["Culture", "Benefits", "Engagement", "Exit", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "C++", "Java", "DBMS", "HTML"],
                    B: ["CSS", "JS", "React", "Node", "MongoDB"],
                    C: ["DSA", "OS", "CN", "Python", "Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["Python", "ML", "DL", "NLP", "Vision"],
                    B: ["TensorFlow", "Pandas", "NumPy", "Stats", "Model"],
                    C: ["GenAI", "LLM", "Prompt", "RAG", "Agents"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "Pandas", "SQL", "PowerBI", "Excel"],
                    B: ["ML", "Stats", "EDA", "Cleaning", "Model"],
                    C: ["Dashboard", "Viz", "NLP", "BigData", "Project"],
                  },
                },
              },
            },
          },
        },

        RTU: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["Java", "React", "Node", "MongoDB", "Redis"],
                    B: ["Express", "SQL", "AWS", "Docker", "CI/CD"],
                    C: ["Microservices", "Kafka", "System Design", "DSA", "OS"],
                  },
                },
                IT: {
                  sections: {
                    A: ["Web", "API", "Cloud", "Security", "Linux"],
                    B: ["Python", "Django", "FastAPI", "Postgres", "Redis"],
                    C: ["K8s", "DevOps", "Jenkins", "Git", "Project"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Machine", "Workshop", "CAD", "CAM", "Design"],
                    B: ["Engine", "Hydraulic", "Fluid", "Thermo", "CNC"],
                    C: ["Robotics", "Tool", "Heat", "Material", "Project"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Budget", "Tax", "Audit", "Accounts", "Funds"],
                    B: ["Stock", "Equity", "Risk", "Research", "Excel"],
                    C: ["Banking", "Loans", "Insurance", "Portfolio", "GST"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["Brand", "SEO", "SEM", "Sales", "Lead"],
                    B: ["Campaign", "CRM", "Social", "Email", "Analytics"],
                    C: ["Growth", "PR", "Market", "Research", "Strategy"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Recruitment", "Payroll", "Training", "Review", "KPI"],
                    B: ["Policy", "Attendance", "Leave", "Law", "Benefits"],
                    C: ["Culture", "Engagement", "Exit", "Survey", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "Java", "HTML", "CSS", "JS"],
                    B: ["React", "Node", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "Python", "OS", "CN", "Mini Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["ML", "DL", "NLP", "Vision", "Python"],
                    B: ["Stats", "Model", "TensorFlow", "Pandas", "NumPy"],
                    C: ["Prompt", "LLM", "Agents", "RAG", "Project"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "SQL", "Pandas", "Excel", "PowerBI"],
                    B: ["EDA", "ML", "Viz", "Dashboard", "BigData"],
                    C: ["NLP", "Forecast", "Cleaning", "Model", "Project"],
                  },
                },
              },
            },
          },
        },

        Poornima: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["DSA", "DBMS", "OS", "CN", "React"],
                    B: ["Node", "MongoDB", "SQL", "Java", "Python"],
                    C: ["AI", "ML", "Cloud", "DevOps", "Testing"],
                  },
                },
                IT: {
                  sections: {
                    A: ["HTML", "CSS", "JS", "React", "Node"],
                    B: ["Java", "Spring", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "OS", "CN", "AWS", "Docker"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Thermo", "CAD", "Fluid", "Machine", "Design"],
                    B: ["Robotics", "AutoCAD", "Welding", "CNC", "Tool"],
                    C: ["Heat", "Strength", "Production", "Workshop", "Viva"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Accounts", "Tax", "Audit", "Investment", "Economics"],
                    B: ["Banking", "Budget", "Payroll", "GST", "Excel"],
                    C: ["Business", "Risk", "Market", "Funds", "Research"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["SEO", "Ads", "Branding", "Sales", "Digital"],
                    B: ["Market", "CRM", "Lead", "Email", "Campaign"],
                    C: ["Growth", "Social", "Content", "Analytics", "PR"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Hiring", "Payroll", "Policy", "Training", "Law"],
                    B: ["Onboarding", "Attendance", "Leave", "Review", "KPI"],
                    C: ["Culture", "Benefits", "Engagement", "Exit", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "C++", "Java", "DBMS", "HTML"],
                    B: ["CSS", "JS", "React", "Node", "MongoDB"],
                    C: ["DSA", "OS", "CN", "Python", "Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["Python", "ML", "DL", "NLP", "Vision"],
                    B: ["TensorFlow", "Pandas", "NumPy", "Stats", "Model"],
                    C: ["GenAI", "LLM", "Prompt", "RAG", "Agents"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "Pandas", "SQL", "PowerBI", "Excel"],
                    B: ["ML", "Stats", "EDA", "Cleaning", "Model"],
                    C: ["Dashboard", "Viz", "NLP", "BigData", "Project"],
                  },
                },
              },
            },
          },
        },

        Banasthali: {
          courses: {
            BTech: {
              branches: {
                CSE: {
                  sections: {
                    A: ["Java", "React", "Node", "MongoDB", "Redis"],
                    B: ["Express", "SQL", "AWS", "Docker", "CI/CD"],
                    C: ["Microservices", "Kafka", "System Design", "DSA", "OS"],
                  },
                },
                IT: {
                  sections: {
                    A: ["Web", "API", "Cloud", "Security", "Linux"],
                    B: ["Python", "Django", "FastAPI", "Postgres", "Redis"],
                    C: ["K8s", "DevOps", "Jenkins", "Git", "Project"],
                  },
                },
                Mechanical: {
                  sections: {
                    A: ["Machine", "Workshop", "CAD", "CAM", "Design"],
                    B: ["Engine", "Hydraulic", "Fluid", "Thermo", "CNC"],
                    C: ["Robotics", "Tool", "Heat", "Material", "Project"],
                  },
                },
              },
            },
            MBA: {
              branches: {
                Finance: {
                  sections: {
                    A: ["Budget", "Tax", "Audit", "Accounts", "Funds"],
                    B: ["Stock", "Equity", "Risk", "Research", "Excel"],
                    C: ["Banking", "Loans", "Insurance", "Portfolio", "GST"],
                  },
                },
                Marketing: {
                  sections: {
                    A: ["Brand", "SEO", "SEM", "Sales", "Lead"],
                    B: ["Campaign", "CRM", "Social", "Email", "Analytics"],
                    C: ["Growth", "PR", "Market", "Research", "Strategy"],
                  },
                },
                HR: {
                  sections: {
                    A: ["Recruitment", "Payroll", "Training", "Review", "KPI"],
                    B: ["Policy", "Attendance", "Leave", "Law", "Benefits"],
                    C: ["Culture", "Engagement", "Exit", "Survey", "Docs"],
                  },
                },
              },
            },
            BCA: {
              branches: {
                Computer: {
                  sections: {
                    A: ["C", "Java", "HTML", "CSS", "JS"],
                    B: ["React", "Node", "SQL", "MongoDB", "Express"],
                    C: ["DSA", "Python", "OS", "CN", "Mini Project"],
                  },
                },
                AI: {
                  sections: {
                    A: ["ML", "DL", "NLP", "Vision", "Python"],
                    B: ["Stats", "Model", "TensorFlow", "Pandas", "NumPy"],
                    C: ["Prompt", "LLM", "Agents", "RAG", "Project"],
                  },
                },
                DataScience: {
                  sections: {
                    A: ["Python", "SQL", "Pandas", "Excel", "PowerBI"],
                    B: ["EDA", "ML", "Viz", "Dashboard", "BigData"],
                    C: ["NLP", "Forecast", "Cleaning", "Model", "Project"],
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  const filterdata = Object.keys(phoneData).filter((phonecom) => {
    return Object.keys(
      phoneData[phonecom]).some((phonetype) => {
        return Object.keys(
          phoneData[phonecom][phonetype]).some((pro) => {
            return phoneData[phonecom][phonetype][pro].models.some((x) =>
              x.toLowerCase().includes(search.toLowerCase())
            );
          })
       
      })
  });
    
  useEffect(() => {
    // dispatch(setaboutdata({ name: "Manish", age: 22 }));
  }, []);
  console.log(filterdata)

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="search the item"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        {filterdata.map((x, index) => (
          <p key={index}>
            {x}
            <div>
              {Object.keys(phoneData[x]).map((phonecom) => (
                <div>
                  <div>
                    <p>{phonecom}</p>
                  </div>
                  {Object.keys(phoneData[x][phonecom]).map((phonetype) => (
                    <div>
                      <div>{phonetype}</div>
                      {phoneData[x][phonecom][phonetype].models.map(
                        (phonemodel, k) => (
                          <p key={k}>{phonemodel}</p>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </p>
        ))}
      </div>
      <div>
        <label>
          select the state
          <select value={state} onChange={(e) => setstate(e.target.value)}>
            <option>select the opt</option>
            {Object.keys(collegeData).map((x, index) => (
              <option key={index}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          select the colleage
          <select value={collage} onChange={(e) => setcollage(e.target.value)}>
            <option value="">select the opt</option>
            {state &&
              Object.keys(collegeData[state].colleges).map((coll, index) => (
                <option key={index} value={coll}>
                  {coll}
                </option>
              ))}
          </select>
        </label>
        <label>
          select the course
          <select value={course} onChange={(e) => setcourse(e.target.value)}>
            <option value="">select the opt</option>
            {state &&
              collage &&
              Object.keys(
                collegeData[state].colleges[collage].courses || {},
              ).map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
          </select>
        </label>
        <label>
          select the branch
          <select onChange={(e) => setbranch(e.target.value)} value={branch}>
            <option value="">select in otp</option>
            {state &&
              collage &&
              course &&
              Object.keys(
                collegeData[state].colleges[collage].courses[course].branches ||
                  {},
              ).map((x, index) => <option key={index}>{x}</option>)}
          </select>
        </label>
        <label>
          select the sections
          <select
            value={sections}
            onChange={(e) => setsections(e.target.value)}
          >
            <option value="">select the op</option>
            {state &&
              collage &&
              course &&
              branch &&
              Object.keys(
                collegeData[state].colleges[collage].courses[course].branches[
                  branch
                ].sections || {},
              ).map((x, index) => (
                <option key={index} value={x}>
                  {x}
                </option>
              ))}
          </select>
        </label>
        <label>
          select the section
          <select
            value={sectionsskill}
            onChange={(e) => setsectionsskill(e.target.value)}
          >
            <option value="">select skill the opt</option>
            {state &&
              course &&
              collage &&
              branch &&
              sections &&
              (
                collegeData[state].colleges[collage].courses[course].branches[
                  branch
                ].sections[sections] || []
              ).map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default About;
