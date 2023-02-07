import { observer } from 'mobx-react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './friends-slider.scss';

import { Pagination } from 'swiper';
import { getSnapshot } from 'mobx-state-tree';
const Friend = ({ friends, getFriendProfile }) => {
  const n = require('application/assets/img/defaultPhoto.jpg');
  console.log(friends.map(item => getSnapshot(item.setting)));
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {friends.map((item, index) => (
          <SwiperSlide key={index}>
            <div slot="container-start" className="friend">
              <img style={{ cursor: 'pointer' }} onClick={() => getFriendProfile(item.id)} src={n} alt="" />
              <span className="text-muted">
                {!item?.setting[0]?.name || !item?.setting[0]?.lastName
                  ? item.login
                  : `${item.setting[0].name} ${item.setting[0].lastName}`}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default observer(Friend);
