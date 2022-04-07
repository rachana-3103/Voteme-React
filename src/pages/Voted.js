import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'reactstrap';
import { AuthData } from '../helper/AuthData';
import ToastMessage from '../helper/ToastMessage';

const Voted = (props) => {
    const navigate =  useNavigate();
    const userInfo = AuthData();
    const {
        voted,
        option,
        userId,
        queryId,
        optionId,
    } = props.voted;

    const [modal, setModal] = useState(false);
    const [voteSuccess, setVoteSucess] = useState(false);

   const toggle = () => setModal(!modal);

    const onVoted = async (userId, queryId, optionId) => {
        const body = { UserID: userId, QueryId: queryId, OptionId: optionId };
        const giveVote = await axios.post('http://localhost:8080/voteme/givevote', body, { headers: userInfo.header });

        if (giveVote.data.Error) {
            ToastMessage(giveVote.data.Error.Message, false);
        } else {
            setVoteSucess(true);
        }
    }
    const CloseVote =  () => {
        navigate('/home');
    }

    return (
        <div>
            {!voteSuccess && <Modal isOpen={voted} toggle={props.close} style={{ top: '15%', position: 'relative' }}>
                <div class="vote-popup-box">
                    <div className="detete-opt"><span className="delete" onClick={props.close}>X</span></div>
                    <div class="vote-popup-inner">
                        {/* <div class="vote-popup-img-box" style={{ backgroundImage: `url("assets/images/Visiting & Travel2.jpg")` }}> */}
                        {/* </div> */}
                        <div class="vote-popup-desc">Are you want to confirm vote for <span>{option}?</span></div>
                        <div class="popup-btn-grp flex-box submit-btn">
                            <button type="button vote" onClick={() => onVoted(userId, queryId, optionId)}> Vote</button>
                            <button class="btn-cancel" type="button" onClick={props.close}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>}

            {voteSuccess &&
                <Modal isOpen={voted} toggle={props.close} style={{ top: '15%', position: 'relative' }}>
                    <img src='assets/images/voted.gif' alt="" style={{ position: 'absolute', width: '100%', height: '100%' }} />
                    <div className="detete-opt"><span className="delete" style={{ color: 'black' }} onClick={CloseVote}>X</span></div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '300px', alignItems: 'center' }}>
                        <span style={{ fontSize: '35px', fontFamily: 'Sans-serif', color: 'cadetblue' }}>Voted Successfully!!</span></div>
                </Modal>
            }
        </div >
    );
}

export default Voted;