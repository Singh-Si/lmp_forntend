import React from 'react'
import "./typing.css"
import { UseUserContext } from '../../UserContextAppProvider';
import { useSelector } from 'react-redux';
const TypinIndicator = ({Typeing}) => {
   const {
     Userid,
   } = useSelector((state) => state.SocketReducer);
  return (
    <>
      {Userid && Userid !== Typeing.userid && Typeing.isTyping ? (
        <div className="typing">
          <span>{`${Typeing?.username}(${Typeing?.usertype}) is typing`}</span>
          <div className="typing__dot"></div>
          <div className="typing__dot"></div>
          <div className="typing__dot"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TypinIndicator
