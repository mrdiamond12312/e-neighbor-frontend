import { useIntl } from '@umijs/max';
import React, { useState } from 'react';

import FadeIn from '@/components/AnimationKit/FadeIn';
import FlushReveal from '@/components/AnimationKit/FlushReveal';
import SwipeNavigation from '@/pages/about-us/components/SwipeNavigation';

const TeamMembers: React.FC = () => {
  const { formatMessage } = useIntl();

  const [pointer, setPointer] = useState(0);

  const member = [
    {
      id: 1,
      firstName: 'Kim Cương',
      lastName: 'Hoàng',
      expertise: 'Fullstack',
      job: 'Developer',
      acronym: 'DIAMOND',
      image: 'https://ik.imagekit.io/AliaV14/hoangkimcuong.png',
    },
    {
      id: 1,
      firstName: 'Minh Thuấn',
      lastName: 'Nguyễn',
      expertise: 'Back End',
      job: 'Developer',
      acronym: 'MTHUAN',
      image:
        'https://ik.imagekit.io/AliaV14/414994054_2103249863341837_8802695447316455526_n-removebg-preview%20(1).png?updatedAt=1716661480038',
    },
  ];

  return (
    <section
      className={`h-[calc(100vh-56px)] flex flex-col items-center justify-center m-auto overflow-x-hidden`}
    >
      <FlushReveal
        rootClassName="w-full "
        pointerClassName="bg-favicon bg-no-repeat bg-contain bg-center"
      >
        <h2 className="mx-auto text-center font-sans text-heading-1 m-0 pb-2 font-extrabold">
          {formatMessage({
            id: 'about.team.intro',
            defaultMessage: 'Meet Our Team!',
          })}
        </h2>
        <p className="font-sans text-center text-heading-5">
          {formatMessage({
            id: 'about.team.intro.mems',
            defaultMessage: 'Project developed by 2 Members',
          })}
        </p>

        <div className="w-full flex flex-col relative mt-20 h-[31rem]">
          <div className="left-corner-trapezoid-background absolute top-0" />

          <FadeIn direction="right" key={member[pointer].acronym}>
            <div className="pl-4 text-neutral-6 text-9xl font-extrabold absolute">
              {member[pointer].acronym}
            </div>
          </FadeIn>

          <div className="w-full flex flex-row pt-24 ">
            <div className="absolute bottom-[1.5rem] right-[37%] z-30">
              <SwipeNavigation datas={member} setPointer={setPointer} />
            </div>
            <div className="w-[30rem] flex flex-row relative justify-end ">
              <div className="left-corner-trapezoid absolute top-0 z-0" />

              <FadeIn direction="left" key={member[pointer].id}>
                <div className="pt-2 pr-16 flex flex-col relative gap-3 z-0">
                  <p className=" text-heading-1 text-neutral-1 font-extrabold">
                    {formatMessage({
                      id: 'about.team.member.no',
                      defaultMessage: 'Member',
                    })}
                  </p>
                  <p className="text-neutral-1 font-bold text-7xl">{`0${member[pointer].id}`}</p>
                </div>
              </FadeIn>
            </div>

            <div className="right-corner-trapezoid absolute right-0 ">
              <div className="pr-8 h-[25rem] flex flex-col items-end justify-center">
                <FadeIn direction="right" key={member[pointer].expertise}>
                  <p className="text-heading-5">{member[pointer].expertise}</p>

                  <p className="text-heading-5">{member[pointer].job}</p>
                </FadeIn>
                <FadeIn
                  direction="right"
                  key={member[pointer].firstName + member[pointer].lastName}
                  index={5}
                >
                  <p className="text-heading-2 font-extrabold text-right">
                    {member[pointer].firstName}
                  </p>
                  <p className="text-heading-2 font-extrabold text-right">
                    {member[pointer].lastName}
                  </p>
                </FadeIn>
              </div>
            </div>
            <FadeIn
              direction="right"
              index={5}
              key={member[pointer].image ?? '/team-members/unknown.webp'}
            >
              <img
                src={member[pointer].image ?? '/team-members/unknown.webp'}
                className="h-[35rem] z-10 -translate-y-1/3"
              />
            </FadeIn>
          </div>
        </div>
      </FlushReveal>
    </section>
  );
};

export default TeamMembers;
