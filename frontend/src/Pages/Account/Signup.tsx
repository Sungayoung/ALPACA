import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CBtn from '../../Components/Commons/CBtn';
import CContainerWithLogo from '../../Components/Commons/CContainerWithLogo';
import CInput from '../../Components/Commons/CInput';
import CInputWithBtn from '../../Components/Commons/CInputWithBtn';
import BojIdSearch from '../../Components/Dialogs/BojIdSearch';
import { customAxios } from '../../Lib/customAxios';
import { setLoading } from '../../Redux/commonReducer';

function Signup() {
  // 사용할 hook 선언
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 회원가입에 필요한 유저정보 정의
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [bojId, setBojId] = useState<string>('');

  // 중복검사 여부 체크
  const [isUsernameChecked, setIsUsernameChecked] = useState<boolean>(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState<boolean>(false);

  // 백준id검색 dialog open
  const [open, setOpen] = useState<boolean>(false);

  // 유효성 검사 실패 메시지
  const [usernameMessage, setUsernameMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');

  // 유저정보 입력 및 유효성 검사 정보
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/;
  const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]?).{6,20}$/;

  // 아이디 중복체크
  const usernameDuplicateCheck = async () => {
    if (username === '') {
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(true));

    if (isUsernameChecked) {
      setIsUsernameChecked(false);
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await customAxios({
        method: 'get',
        url: `/auth/duplicated/username`,
        params: { username },
      });
      setIsUsernameChecked(true);
    } catch (e: any) {
      setIsUsernameChecked(false);
      if (e.response.status === 409) {
        setUsernameMessage(e.response.data.message);
      } else {
        setUsernameMessage('아이디 중복검사에 실패했습니다.');
        console.log(e);
      }
    }

    dispatch(setLoading(false));
  };

  // 닉네임 중복체크
  const nicknameDuplicateCheck = async () => {
    if (nickname === '') {
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(true));

    if (isNicknameChecked) {
      setIsUsernameChecked(false);
      dispatch(setLoading(false));
      return;
    }

    try {
      const res = await customAxios({
        method: 'get',
        url: `/auth/duplicated/nickname`,
        params: { nickname },
      });
      setIsNicknameChecked(true);
    } catch (e: any) {
      setIsNicknameChecked(false);
      if (e.response.status === 409) {
        setNicknameMessage(e.response.data.message);
      } else {
        setNicknameMessage('닉네임 중복검사에 실패했습니다.');
        console.log(e);
      }
    }

    dispatch(setLoading(false));
  };

  // 회원가입
  const signup = async () => {
    dispatch(setLoading(true));

    const userInfo = {
      username,
      password,
      passwordCheck,
      nickname,
      bojId,
    };
    try {
      const res = await customAxios({
        method: 'post',
        url: '/auth/signup',
        data: userInfo,
      });
      navigate('/login');
    } catch (e: any) {
      console.log(e.message);
      console.log(e.status);
    }

    dispatch(setLoading(false));
  };

  // 엔터키 눌렀을 때 => 엔터키 인식부분은 CContainerWithLogo에 선언되어있음
  const onkeyPressHandler = () => {
    if (!!username && !!password && !!passwordCheck && !!nickname && !!bojId) {
      signup();
    }
  };

  // 비밀번호 유효성검사
  useEffect(() => {
    if (!password || passwordRegex.test(password)) {
      setPasswordMessage('');
    } else {
      setPasswordMessage('영문자+숫자+특수문자 조합으로 8자리이상 입력하세요.');
    }
  }, [password]);

  // 비밀번호 일치검사
  useEffect(() => {
    if (!!passwordCheck && password !== passwordCheck) {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordCheckMessage('');
    }
  }, [password, passwordCheck]);

  // ID 유효성검사
  useEffect(() => {
    if (!username || usernameRegex.test(username)) {
      setUsernameMessage('');
    } else {
      setUsernameMessage('영문자+숫자 조합으로 6자리 이상 20자리 이하로 입력해주세요.');
    }
  }, [username]);

  // // 닉네임 유효성검사
  useEffect(() => {
    if (!nickname || (nickname.length > 1 && nickname.length < 21)) {
      setNicknameMessage('');
    } else {
      setNicknameMessage('닉네임은 2글자 이상 20글자 이하로 입력해주세요.');
    }
  }, [nickname]);

  return (
    <CContainerWithLogo onKeyPress={onkeyPressHandler}>
      <BojIdSearch open={open} setOpen={setOpen} setBojId={setBojId} />
      <CInputWithBtn
        onChange={setUsername}
        label="ID"
        buttonContent={isUsernameChecked ? '수정하기' : '중복확인'}
        onButtonClick={usernameDuplicateCheck}
        readOnly={isUsernameChecked}
        helperText={usernameMessage}
        buttonDisable={!!usernameMessage}
      />
      <CInput
        type="password"
        onChange={setPassword}
        label="PASSWORD"
        helperText={passwordMessage}
      />
      <CInput
        type="password"
        onChange={setPasswordCheck}
        label="PASSWORD CONFIRM"
        helperText={passwordCheckMessage}
      />
      <CInputWithBtn
        onChange={setNickname}
        label="NICKNAME"
        buttonContent={isNicknameChecked ? '수정하기' : '중복확인'}
        onButtonClick={nicknameDuplicateCheck}
        readOnly={isNicknameChecked}
        helperText={nicknameMessage}
        buttonDisable={!!nicknameMessage}
      />
      <CInputWithBtn
        onChange={setBojId}
        label="BOJ ID"
        buttonContent="ID검색"
        onButtonClick={() => setOpen(true)}
        readOnly={true}
        value={bojId}
      />
      <div style={{ width: '100%', justifyContent: 'space-around', display: 'flex' }}>
        <CBtn
          width="30%"
          content="뒤로가기"
          onClick={() => navigate(-1)}
          backgroundColor="rgba(0,0,0,0)"
        />
        <CBtn
          width="30%"
          content="회원가입"
          onClick={signup}
          // 회원가입 유효성 검사 통과시에만 활성화
          disabled={
            !!usernameMessage ||
            !!passwordMessage ||
            !!passwordCheckMessage ||
            !!nicknameMessage ||
            isUsernameChecked === false ||
            isNicknameChecked === false
          }
        />
      </div>
    </CContainerWithLogo>
  );
}

export default Signup;
