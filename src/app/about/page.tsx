"use client";

import React, { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CgShapeRhombus } from "react-icons/cg";
import { GoDash } from "react-icons/go";
import { Link as ScrollLink } from "react-scroll";

const AboutUs = () => {
  const [structure, setStructure] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("about-section-1");
  const handleSetActive = (to: string) => {
    console.log(to);
    setActiveSection(to);
  };
  return (
    <div className="pt-14">
      <h1 className="text-center text-2xl text-slate-800 font-bold py-8">
        Welcome to Maxking Institute
      </h1>
      <div className="w-[80%] mx-auto flex gap-4">
        <div className="w-[15%] min-h-screen border-t px-4 py-2 fixed">
          <ul className="flex flex-col gap-2">
            <ScrollLink
              to="about-section-1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group">
                <CgShapeRhombus
                  className={`group-hover:text-slate-800 ${
                    activeSection === "about-section-1"
                      ? "text-[#D6882D]"
                      : "text-slate-500"
                  }`}
                />{" "}
                <span className="text-[#D6882D] group-hover:underline">
                  About Max king
                </span>
              </li>
            </ScrollLink>
            <ScrollLink
              to="about-section-2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group">
                <CgShapeRhombus
                  className={`group-hover:text-slate-800 ${
                    activeSection === "about-section-2"
                      ? "text-[#D6882D]"
                      : "text-slate-500"
                  }`}
                />{" "}
                <span className="text-[#D6882D] group-hover:underline">
                  Structure
                </span>
              </li>
            </ScrollLink>
            <ScrollLink
              to="about-section-2"
              // spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => {
                setStructure(0);
              }}
            >
              {" "}
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group pl-5">
                <span
                  className={`text-[#D6882D] group-hover:underline ${
                    activeSection === "about-section-2" &&
                    structure === 0 &&
                    "underline"
                  }`}
                >
                  Vision and mission
                </span>
              </li>
            </ScrollLink>

            <ScrollLink
              to="about-section-2"
              // spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => {
                setStructure(1);
              }}
            >
              {" "}
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group pl-5">
                <span
                  className={`text-[#D6882D] group-hover:underline ${
                    activeSection === "about-section-2" &&
                    structure === 1 &&
                    "underline"
                  }`}
                >
                  Division
                </span>
              </li>
            </ScrollLink>
            <ScrollLink
              to="about-section-2"
              // spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onClick={() => {
                setStructure(2);
              }}
            >
              {" "}
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group pl-5">
                <span
                  className={`text-[#D6882D] group-hover:underline ${
                    activeSection === "about-section-2" &&
                    structure === 2 &&
                    "underline"
                  }`}
                >
                  Membership
                </span>
              </li>
            </ScrollLink>

            <ScrollLink
              to="about-section-3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={handleSetActive}
            >
              {" "}
              <li className="text-slate-800 flex items-center gap-1 cursor-pointer group">
                <CgShapeRhombus
                  className={`group-hover:text-slate-800 ${
                    activeSection === "about-section-3"
                      ? "text-[#D6882D]"
                      : "text-slate-500"
                  }`}
                />{" "}
                <span className="text-[#D6882D] group-hover:underline">
                  Our team
                </span>
              </li>
            </ScrollLink>
          </ul>
        </div>
        <div className="w-[85%] flex flex-col items-center justify-start gap-5 border-t ml-52 ">
          <div className="w-[90%] mx-auto" id="about-section-1">
            <h1 className="text-xl text-[#D6882D] font-bold py-2">
              About Max King
            </h1>
            <p className="text-slate-600">
              Max King’s Institute (MKI), is a nonprofit organization dedicated
              to building and helping communities achieve sustainable
              development operating over three dimensions of the community such
              as health, wealth and education.
            </p>
            {/* </div>

          <div className="w-[90%] mx-auto"> */}
            <h1 className="text-xl text-slate-800 font-bold py-2">
              Our Mission Through our different programs and strategies:
            </h1>
            <ul className="flex flex-col items-start gap-3">
              <li className="text-slate-600 flex items-center gap-2">
                <IoCheckmarkDoneOutline className="text-2xl text-slate-800" />
                <span>
                  We offer teaching and training to communities about health,
                  wealth and welfare; leadership, and technology.
                </span>
              </li>
              <li className="text-slate-600 flex items-center gap-2">
                <IoCheckmarkDoneOutline className="text-2xl text-slate-800" />
                <span>
                  We do research and advocacy to promote, improve and develop
                  the community’s health, wealth and education and ensure
                  quality of life.
                </span>
              </li>
              <li className="text-slate-600 flex items-center gap-2">
                <IoCheckmarkDoneOutline className="text-2xl text-slate-800" />
                <span>
                  We do Support vulnerable communities to improve socio-economic
                  growth and ensure the quality of life and development as well.
                </span>
              </li>
            </ul>
            <div className="mt-8"></div>
            <div className="pb-8">
              <img src="/aboutus1.jpg" alt="" className="w-full h-auto" />
            </div>
          </div>
          <div
            className="w-full min-h-96 bg-slate-100 border flex flex-col gap-8 pb-8"
            id="about-section-2"
          >
            <div className="w-full h-10 grid grid-cols-3 gap-[1px]">
              <h1
                className={`cursor-pointer hover:bg-slate-500 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 0
                    ? "bg-slate-100 text-slate-800"
                    : "bg-slate-600 text-zinc-50"
                }`}
                onClick={() => {
                  setStructure(0);
                }}
              >
                Mission & Vision
              </h1>
              <h1
                className={`cursor-pointer hover:bg-slate-500 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 1
                    ? "bg-slate-100 text-slate-800"
                    : "bg-slate-600 text-zinc-50"
                }`}
                onClick={() => {
                  setStructure(1);
                }}
              >
                Division
              </h1>
              <h1
                className={`cursor-pointer hover:bg-slate-500 hover:text-zinc-50 flex flex-col items-center justify-center transition-all ease-in-out duration-150 ${
                  structure == 2
                    ? "bg-slate-100 text-slate-800"
                    : "bg-slate-600 text-zinc-50"
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
                  <h1 className="text-xl text-slate-800 font-bold py-2">
                    Our Mission
                  </h1>
                  <p className="text-slate-600">
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
                  <h1 className="text-xl text-slate-800 font-bold py-2">
                    Our Vision
                  </h1>
                  <p className="text-slate-600">
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
                  <h1 className="text-xl text-slate-800 font-bold py-2">
                    Our Values
                  </h1>
                  <p className="text-slate-600">
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
                <p className="text-slate-600">
                  To carry out the mission, MKI developed a Comprehensive
                  working areas Strategy as listed below:
                </p>
                <ul className="font-semibold py-4 text-slate-800">
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
                <p className="text-slate-600">
                  At MKI we work on the above three key angles of community
                  development to ensure full package activities along with our
                  goals to promoting sustainable community development.
                </p>
                <p className="text-slate-600">
                  Through our key strategic activities: research,
                  teaching/training, advocacy and support to the community, we
                  identify the potential needs, difficulties and challenges
                  communities have and we inform, make them aware, highlight the
                  way forward to overcome that from individuals and collectively
                  to the highest level to provide sustainable solutions
                  together.
                </p>
                <h1 className="text-xl text-slate-800 font-bold py-2">
                  Community Health division
                </h1>
                <p className="text-slate-600">
                  Community health is a major foundation of everything, At MKI
                  we focus on the maintenance, protection, and improvement of
                  the health status of population and communities.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  With our different approaches, we assess and identify valid
                  and reliable health solutions. We point the need and utility
                  and or the accuracy on the environmental, social, and economic
                  resources to sustain healthy lifestyle, emotional and physical
                  wellbeing among people in ways that advance their aspirations
                  and satisfy their needs in their unique environment.
                </p>
                <h1 className="text-xl text-slate-800 font-bold py-2">
                  Community Wealth division
                </h1>
                <p className="text-slate-600">
                  As one of the key components MKI works on among the three;
                  Community wealth includes the collective assets such as
                  social, intellectual, cultural, financial that it owns or
                  controls to enable caring for one another and the natural
                  environment.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  And at MKI We want the communities enable the cause that will
                  bring transformation to their life and drive them deep enough
                  to overcome all the obstacles that stand between them and
                  financial freedom.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  Through different activities, we help communities Building
                  practical systems approach to economic development, which is
                  built on local roots and plurality of ownership.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  Through this process we ensure a more reliable set of outcomes
                  including jobs creation and meaningful work, equity,
                  inclusion, economic stability and environmental
                  sustainability.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  By taking on the journey through creating wealth, we also
                  expose people in diversified strategies with a long-term view
                  as key to sustaining wealth within their communities.
                </p>
                <h1 className="text-xl text-slate-800 font-bold py-2">
                  Community Education
                </h1>
                <p className="text-slate-600">
                  At MKI, we engage in{" "}
                  <span className="font-semibold">
                    community learning & development
                  </span>
                  , to enable potentials and to develop the capacity of
                  individuals and groups of all ages and to improve their
                  quality of life.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  We promote learning and social development work with
                  individuals and groups in their communities using a range of
                  approaches/ methods.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  With this work, MKI inspires and exposes communities to
                  different opportunities to cover a long run significant and
                  meaningful change of their life.
                </p>
                <div className="my-3"></div>
                <p className="text-slate-600">
                  In shaping the learning and development activities to enhance
                  quality of life and sphere of influence of communities we base
                  on a range of approaches:
                </p>
                <div className="my-3"></div>
                <ul className="list-disc text-slate-800 pl-4">
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
                <p className="text-slate-600">
                  To ensure successful outcomes we more engage communities and
                  participants in our education programs and activities.
                </p>
              </div>
            )}
            {structure === 2 && (
              <>
                <div className="w-[90%] mx-auto">
                  <h1 className="text-xl text-slate-800 font-bold py-2">
                    Membership categories
                  </h1>
                  <p className="text-slate-600">
                    We have a great and dedicated team of different categories
                    of membership:
                  </p>
                  <div className=" flex items-center gap-3 text-slate-800 font-bold py-2">
                    <GoDash /> Founder members
                  </div>
                  <p className="text-slate-600">
                    They are members who have signed on incorporation statute
                    and are full time involved the organization’s activities.
                    Such a member may hold office and has voting rights.
                  </p>
                  <div className="my-3"></div>
                  <div className=" flex items-center gap-3 text-slate-800 font-bold py-2">
                    <GoDash />
                    Adherent members
                  </div>
                  <p className="text-slate-600">
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
                  <div className=" flex items-center gap-3 text-slate-800 font-bold py-2">
                    <GoDash />
                    Honorary member
                  </div>
                  <p className="text-slate-600">
                    This membership category may be awarded by the MKI Executive
                    board to a person who excelled in furthering our objectives.
                    Such a member may not hold office and has no voting rights.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="w-[90%] mx-auto mb-12" id="about-section-3">
            <h1 className="text-xl text-[#D6882D] font-bold py-2">Our team</h1>
            <div className="shadow-lg min-h-[800px] w-full bg-slate-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
