import React, { useState } from 'react';
import { useIntl } from '@umijs/max';
import SwipeNavigation from '@/pages/AboutUs/components/SwipeNavigation';

const TeamMembers: React.FC = () => {
  const { formatMessage } = useIntl();

  const [pointer, setPointer] = useState(0);

  const member = [
    {
      id: 1,
      firstName: 'Kim Cương',
      lastName: 'Hoàng',
      expertise: 'FrontEnd',
      job: 'Developer',
      acronym: 'DIAMOND',
      image: '/team-members/hoangkimcuong.webp',
    },
    {
      id: 2,
      firstName: 'Trọng Phú',
      lastName: 'Nguyễn',
      expertise: 'FrontEnd',
      job: 'Developer',
      acronym: 'CLITUS',
    },
    {
      id: 3,
      firstName: 'Minh Thuấn',
      lastName: 'Nguyễn',
      expertise: 'BackEnd',
      job: 'Developer',
      acronym: 'MTHUAN',
    },
  ];

  return (
    <section
      className={`h-[calc(100vh-56px)] flex flex-col items-center justify-center m-auto overflow-x-hidden`}
    >
      <h2 className="font-sans text-heading-1 m-0 pb-2 font-extrabold">
        {formatMessage({
          id: 'about.team.intro',
          defaultMessage: 'Meet Our Team!',
        })}
      </h2>
      <p className="font-sans text-heading-5">
        {formatMessage({
          id: 'about.team.intro.mems',
          defaultMessage: 'Project developed by 3 Members',
        })}
      </p>

      <div className="w-full flex flex-col relative mt-20 h-[31rem]">
        <div className="left-corner-trapezoid-background absolute top-0" />
        <div className="pl-4 text-neutral-6 text-9xl font-extrabold absolute">
          {member[pointer].acronym}
        </div>

        <div className="w-full flex flex-row pt-24 ">
          <div className="absolute bottom-[1.5rem] right-[37%] z-30">
            <SwipeNavigation datas={member} setPointer={setPointer} />
          </div>
          <div className="w-[30rem] flex flex-row relative justify-end ">
            <div className="left-corner-trapezoid absolute top-0 z-0" />
            <div className="pt-2 pr-16 flex flex-col relative gap-3 z-0">
              <p className=" text-heading-1 text-neutral-1 font-extrabold">
                {formatMessage({
                  id: 'about.team.member.no',
                  defaultMessage: 'Member',
                })}
              </p>
              <p className="text-neutral-1 font-bold text-7xl">{`0${member[pointer].id}`}</p>
            </div>
          </div>

          <div className="right-corner-trapezoid absolute right-0 ">
            <div className="pr-8 h-[25rem] flex flex-col items-end justify-center">
              <p className="text-heading-5">{member[pointer].expertise}</p>
              <p className="text-heading-5">{member[pointer].job}</p>
              <p className="text-heading-2 font-extrabold text-right">
                {member[pointer].firstName}
              </p>
              <p className="text-heading-2 font-extrabold text-right">{member[pointer].lastName}</p>
            </div>
          </div>
          <img
            src={member[pointer].image ?? '/team-members/unknown.webp'}
            className="h-[35rem] z-10 absolute right-[25%] bottom-[0]"
          ></img>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
