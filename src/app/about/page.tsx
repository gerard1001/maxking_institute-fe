"use client";

import React, { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { GoDash } from "react-icons/go";
import { BsDot } from "react-icons/bs";
import { Menu } from "@mui/material";
import { Tweet } from "react-tweet";

const members = [
  {
    name: "John Doe",
    role: "Founder",
    image: "/member1.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "Jane Doe",
    role: "Co-Founder",
    image: "/member2.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "James Doe",
    role: "CEO",
    image: "/member3.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "Jenny Doe",
    role: "CTO",
    image: "/member4.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "Jack Doe",
    role: "CFO",
    image: "/member5.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "Jade Doe",
    role: "COO",
    image: "/member6.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
  {
    name: "Jasper Doe",
    role: "CMO",
    image: "/member7.png",
    bio: "Kate is a digital creative agency with two offices in London and New York. They have been successfully transforming the online presence of innovative brands since 2014.",
    hobbies: ["PC games", "Reading"],
  },
];

const AboutUs = () => {
  const [structure, setStructure] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [clickedPerson, setClickedPerson] = useState<number>(0);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="pt-10">
      <div className="w-full px-10 flex gap-8 items-start">
        <div className="w-[78%] flex flex-col items-center justify-start gap-5">
          <h1 className="text-center text-2xl text-accent font-bold">
            Welcome to Maxking Institute
          </h1>
          <div className="w-full mx-auto border-t" id="about-section-1">
            <h1 className="text-xl text-accent font-bold py-2">
              About Max King
            </h1>
            <p className="text-accent-foreground">
              Max King’s Institute (MKI), is a nonprofit organization dedicated
              to building and helping communities achieve sustainable
              development operating over three dimensions of the community such
              as health, wealth and education.
            </p>
            <h1 className="text-xl text-accent font-bold py-2">
              Our Mission Through our different programs and strategies:
            </h1>
            <ul className="flex flex-col items-start gap-3">
              <li className="text-accent-foreground flex items-center gap-2">
                <BsDot className="text-2xl text-accent" />
                <span>
                  We offer teaching and training to communities about health,
                  wealth and welfare; leadership, and technology.
                </span>
              </li>
              <li className="text-accent-foreground flex items-center gap-2">
                <BsDot className="text-2xl text-accent" />
                <span>
                  We do research and advocacy to promote, improve and develop
                  the community’s health, wealth and education and ensure
                  quality of life.
                </span>
              </li>
              <li className="text-accent-foreground flex items-center gap-2">
                <BsDot className="text-2xl text-accent" />
                <span>
                  We do Support vulnerable communities to improve socio-economic
                  growth and ensure the quality of life and development as well.
                </span>
              </li>
            </ul>
            <div className="mt-8"></div>
            <div className="pb-8">
              <img src="/aboutus2.jpg" alt="" className="w-full h-auto" />
            </div>
          </div>
          <div
            className="w-full min-h-96 bg-foreground flex flex-col gap-8 pb-8"
            id="about-section-2"
          >
            <div className="w-full h-10 grid grid-cols-3 gap-[1px]">
              <h1
                className={`cursor-pointer hover:bg-primary/80 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 0
                    ? "bg-primary text-white"
                    : "bg-foreground text-accent"
                }`}
                onClick={() => {
                  setStructure(0);
                }}
              >
                Mission & Vision
              </h1>
              <h1
                className={`cursor-pointer hover:bg-primary/80 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 1
                    ? "bg-primary text-white"
                    : "bg-foreground text-accent"
                }`}
                onClick={() => {
                  setStructure(1);
                }}
              >
                Division
              </h1>
              <h1
                className={`cursor-pointer hover:bg-primary/80 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 2
                    ? "bg-primary text-white"
                    : "bg-foreground text-accent"
                }`}
                onClick={() => {
                  setStructure(2);
                }}
              >
                Membership
              </h1>
            </div>{" "}
            {structure === 0 && (
              <>
                <div className="w-[90%] mx-auto">
                  <h1 className="text-xl text-accent font-bold py-2">
                    Our Mission
                  </h1>
                  <p className="text-accent-foreground">
                    Maxking Institute is a leading provider of online education.
                    We are dedicated to providing our students with the best
                    online learning experience. Our mission is to provide
                    high-quality education to students all over the world. We
                    offer a wide range of courses that are designed to help
                    students achieve their academic and career goals. Our
                    courses are taught by experienced instructors who are
                    experts in their fields. We are committed to providing our
                    students with the skills and knowledge they need to succeed
                    in today's competitive job market.
                  </p>
                </div>
                <div className="w-[90%] mx-auto">
                  <h1 className="text-xl text-accent font-bold py-2">
                    Our Vision
                  </h1>
                  <p className="text-accent-foreground">
                    Our vision is to be the premier provider of online
                    education. We strive to provide our students with the best
                    online learning experience. We are committed to helping our
                    students achieve their academic and career goals. We are
                    dedicated to providing our students with the skills and
                    knowledge they need to succeed in today's competitive job
                    market. We are committed to providing our students with the
                    best online learning experience. We are dedicated to
                    providing our students with the skills and knowledge they
                    need to succeed in today's competitive job market.
                  </p>
                </div>
                <div className="w-[90%] mx-auto">
                  <h1 className="text-xl text-accent font-bold py-2">
                    Our Values
                  </h1>
                  <p className="text-accent-foreground">
                    At Maxking Institute, we are committed to providing our
                    students with the best online learning experience. We are
                    dedicated to helping our students achieve their academic and
                    career goals. We are committed to providing our students
                    with the skills and knowledge they need to succeed in
                    today's competitive job market. We are dedicated to
                    providing our students with the best online learning
                    experience. We are dedicated to providing our students with
                    the skills and knowledge they need to succeed in today's
                    competitive job market.
                  </p>
                </div>
              </>
            )}
            {structure === 1 && (
              <div className="w-[90%] mx-auto">
                <p className="text-accent-foreground">
                  To carry out the mission, MKI developed a Comprehensive
                  working areas Strategy as listed below:
                </p>
                <ul className="font-semibold py-4 text-accent">
                  <li className=" flex items-center gap-3">
                    <GoDash /> Health
                  </li>
                  <li className=" flex items-center gap-3">
                    <GoDash /> Wealth
                  </li>
                  <li className=" flex items-center gap-3">
                    <GoDash />
                    Education
                  </li>
                </ul>
                <p className="text-accent-foreground">
                  At MKI we work on the above three key angles of community
                  development to ensure full package activities along with our
                  goals to promoting sustainable community development.
                </p>
                <p className="text-accent-foreground">
                  Through our key strategic activities: research,
                  teaching/training, advocacy and support to the community, we
                  identify the potential needs, difficulties and challenges
                  communities have and we inform, make them aware, highlight the
                  way forward to overcome that from individuals and collectively
                  to the highest level to provide sustainable solutions
                  together.
                </p>
                <h1 className="text-xl text-accent font-bold py-2">
                  Community Health division
                </h1>
                <p className="text-accent-foreground">
                  Community health is a major foundation of everything, At MKI
                  we focus on the maintenance, protection, and improvement of
                  the health status of population and communities.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  With our different approaches, we assess and identify valid
                  and reliable health solutions. We point the need and utility
                  and or the accuracy on the environmental, social, and economic
                  resources to sustain healthy lifestyle, emotional and physical
                  wellbeing among people in ways that advance their aspirations
                  and satisfy their needs in their unique environment.
                </p>
                <h1 className="text-xl text-accent font-bold py-2">
                  Community Wealth division
                </h1>
                <p className="text-accent-foreground">
                  As one of the key components MKI works on among the three;
                  Community wealth includes the collective assets such as
                  social, intellectual, cultural, financial that it owns or
                  controls to enable caring for one another and the natural
                  environment.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  And at MKI We want the communities enable the cause that will
                  bring transformation to their life and drive them deep enough
                  to overcome all the obstacles that stand between them and
                  financial freedom.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  Through different activities, we help communities Building
                  practical systems approach to economic development, which is
                  built on local roots and plurality of ownership.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  Through this process we ensure a more reliable set of outcomes
                  including jobs creation and meaningful work, equity,
                  inclusion, economic stability and environmental
                  sustainability.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  By taking on the journey through creating wealth, we also
                  expose people in diversified strategies with a long-term view
                  as key to sustaining wealth within their communities.
                </p>
                <h1 className="text-xl text-accent font-bold py-2">
                  Community Education
                </h1>
                <p className="text-accent-foreground">
                  At MKI, we engage in{" "}
                  <span className="font-semibold">
                    community learning & development
                  </span>
                  , to enable potentials and to develop the capacity of
                  individuals and groups of all ages and to improve their
                  quality of life.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  We promote learning and social development work with
                  individuals and groups in their communities using a range of
                  approaches/ methods.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  With this work, MKI inspires and exposes communities to
                  different opportunities to cover a long run significant and
                  meaningful change of their life.
                </p>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  In shaping the learning and development activities to enhance
                  quality of life and sphere of influence of communities we base
                  on a range of approaches:
                </p>
                <div className="my-3"></div>
                <ul className="list-disc text-accent pl-4">
                  <li className="my-2">
                    Empowerment – increasing the ability of individuals and
                    groups to influence issues that affect them and their
                    communities;
                  </li>
                  <li className="my-2">
                    Participation – supporting people to take part in decision
                    making;
                  </li>
                  <li className="my-2">
                    Self-determination – supporting the right of people to make
                    their own choices;
                  </li>
                  <li className="my-2">
                    Collaboration – recognizing that many partners can
                    contribute to ensure effectiveness and sustainability of our
                    community learning and development activities.
                  </li>
                  <li className="my-2">
                    Inclusion, equality of opportunity and anti-discrimination –
                    recognizing that some people may need additional support to
                    overcome the barriers they face.
                  </li>
                </ul>
                <div className="my-3"></div>
                <p className="text-accent-foreground">
                  To ensure successful outcomes we more engage communities and
                  participants in our education programs and activities.
                </p>
              </div>
            )}
            {structure === 2 && (
              <>
                <div className="w-[90%] mx-auto">
                  <h1 className="text-xl text-accent font-bold py-2">
                    Membership categories
                  </h1>
                  <p className="text-accent-foreground">
                    We have a great and dedicated team of different categories
                    of membership:
                  </p>
                  <div className=" flex items-center gap-3 text-accent font-bold py-2">
                    <GoDash /> Founder members
                  </div>
                  <p className="text-accent-foreground">
                    They are members who have signed on incorporation statute
                    and are full time involved the organization’s activities.
                    Such a member may hold office and has voting rights.
                  </p>
                  <div className="my-3"></div>
                  <div className=" flex items-center gap-3 text-accent font-bold py-2">
                    <GoDash />
                    Adherent members
                  </div>
                  <p className="text-accent-foreground">
                    They are ordinary members and upon request and after
                    subscription and fulfilment to the present governing
                    statute, they shall be entitled such membership category.
                    They have voting rights and can stand for office.
                  </p>
                  <div className="my-3"></div>
                  <a href="#" className="text-[#D6882D] font-semibold">
                    Apply Here
                  </a>
                  <div className="my-3"></div>
                  <div className=" flex items-center gap-3 text-accent font-bold py-2">
                    <GoDash />
                    Honorary member
                  </div>
                  <p className="text-accent-foreground">
                    This membership category may be awarded by the MKI Executive
                    board to a person who excelled in furthering our objectives.
                    Such a member may not hold office and has no voting rights.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="w-full mx-auto mb-12" id="about-section-3">
            <h1 className="text-xl text-accent font-bold py-2 capitalize">
              meet Our team
            </h1>
            <div className="min-h-[800px] w-full">
              <div className="flex items-start gap-5 justify-center flex-wrap">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center  relative max-w-[200px] w-full"
                  >
                    <div className="overflow-hidden bg-cover bg-no-repeat rounded-full">
                      <img
                        id="demo-positioned-button"
                        aria-controls={
                          open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        src={member.image}
                        onClick={(event) => {
                          handleClick(event);
                          setClickedPerson(index);
                        }}
                        className="w-[250px] aspect-square object-cover rounded-full max-w-[140px] bg-black/20 cursor-pointer transition duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <h1 className="text-accent font-bold">{member.name}</h1>
                    <p className="text-accent-foreground text-sm">
                      {member.role}
                    </p>
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      className="shadow-xs"
                      sx={{
                        "& .MuiPaper-root": {
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                        },
                      }}
                    >
                      <div className="w-[280px] p-3">
                        <div className="flex flex-col items-center">
                          <img
                            src={members[clickedPerson].image}
                            className="w-[250px] aspect-square object-cover rounded-full max-w-[140px] bg-black/20"
                          />
                          <h1 className="text-accent font-bold">
                            {members[clickedPerson].name}
                          </h1>
                          <p className="text-accent-foreground text-sm">
                            {members[clickedPerson].role}
                          </p>
                        </div>

                        <div className="mt-2">
                          <h1 className="text-lg font-bold text-accent">Bio</h1>
                          <p className="text-accent-foreground ">
                            {members[clickedPerson].bio}
                          </p>
                        </div>
                        <div className="mt-2">
                          <h1 className="text-lg font-bold text-accent">
                            Hobbies
                          </h1>
                          <ul className="">
                            {members[clickedPerson].hobbies.map(
                              (hobby, index) => (
                                <li
                                  key={index}
                                  className="text-accent-foreground flex items-center gap-1"
                                >
                                  <BsDot className="text-2xl text-accent" />
                                  <span>{hobby}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </Menu>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[22%] max-h-[100px] light text-xs pt-12">
          <div className="tweet-class">
            <Tweet id="1773356905701802390" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
