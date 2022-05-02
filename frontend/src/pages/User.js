import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Stack, Paper, Grid, Avatar, Button, Box, IconButton, Typography, Switch } from "@mui/material";
import { DeleteIcon, PhotoCamera } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser, updateImage } from "../redux/actions/user";
import { TextField } from "@mui/material";
import axios from 'axios';

export default function User() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.user);
  const [ userData, setUserData ] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const Input = styled("input")({
    display: "none",
  });

  const EtcButton = styled(Button)`
  background: white;
  color: #ff5f70;
  `;

  // 유저 정보 가져오기
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    dispatch(getUser(currentUser.userId))
    .then((data) => {
      setUserData(data);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  // 유저 정보 변경하기
  const [update, setUpdate] = useState(true);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [domain, setDomain] = useState(''); 
  const [introduce, setIntroduce] = useState('');
  let updateNickname, updateIntroduce, updateDomain, updateButton, cancleButton = null;
  
  const onClickUpdate = () => {
      setUpdate(!update);
  }

  const onClickRegister = () => {
      
      dispatch(updateUser(currentUser.userId, email, nickname, domain, introduce))
      .then(() => {
      })
      .catch(() => {  
      })
      setUpdate(!update);
      
      window.location.reload();
  }

  const onClickCancle = () => {
      navigate(0);
  }

  const onNicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const onIntroduceHandler = (e) => {
    setIntroduce(e.target.value);
  };

  const onDomainHandler = (e) => {
    setDomain(e.target.value);
  };


  if (update) {
    updateNickname = <Typography sx={{ marginLeft: 10.8, p: 0.5 }}>{data.nickname}</Typography>
    updateIntroduce = <Typography sx={{ marginLeft: 8.3, p: 0.5 }}>{data.introduce}</Typography>
    updateDomain = <Typography sx={{ marginLeft: 5, p: 0.5 }}>{data.domain}</Typography>
    updateButton = <EtcButton size="small" onClick={onClickUpdate}>수정하기</EtcButton>
  } else {
    updateNickname = <TextField sx={{ marginLeft: 10, p: 0.5}} id="outlined-basic" onChange={onNicknameHandler} defaultValue={data.nickname} variant="outlined" />
    updateIntroduce = <TextField sx={{ marginLeft: 7.4, p: 0.5}} id="outlined-basic" onChange={onIntroduceHandler} defaultValue={data.introduce} variant="outlined" />
    updateDomain = <TextField sx={{ marginLeft: 4.2, p: 0.5}} id="outlined-basic" onChange={onDomainHandler} defaultValue={data.domain} variant="outlined" />
    updateButton = <EtcButton size="small" onClick={onClickRegister}>저장하기</EtcButton>
    cancleButton = <EtcButton size="small" onClick={onClickCancle}>취소</EtcButton>
  }
  
  // 이미지 변경하기

  // const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  // const onImgChange = (e) => {
  //   setImage(e.target.files[0]);
  // }

  // const imageRegister = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('file', image);

  //     dispatch().updateImage((currentUser.userId))
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //   }

  // const [image, setImage] = useState({
  //   image_file: "",
  //   preview_URL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  // });

  // const uploadImage = (e) => {
  //   e.stopPropagation();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   const filesInArr = Array.from(e.target.files);
   
  //   reader.onloadend = () => {
  //     setImage({
  //       image_file: filesInArr,
  //       preview_URL: reader.result,
  //     });
  //   };

  // 이미지, 비디오 
  //   let profile_preview = null;
  //   if (image.image_file !== null) {
  //     profile_preview = image.file[0]?.type.includes('image/') ? (<img src={image.preview_URL} />) : (<video src={image.preview_URL} />); 
  //   }
  // }

  // const deleteImage = () => {
  //   setImage({
  //     image_file: "",
  //     preview_URL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  //   });
  //   setLoaded(false);
  // }

  // const sendImageToServer = () => {
  //   if(image.image_file){
  //     const formData = new FormData()
  //     formData.append('file', image.image_file);
  //     dispatch().updateImage(currentUser.userId, setImage.preview_URL)
  //     .then(() => {
  //       alert("서버에 등록이 완료되었습니다!");
  //       setImage({
  //         image_file: "",
  //         preview_URL: "img/default_image.png",
  //       });
  //       setLoaded(false);
  //     })
      
  //   }
  //   else{
  //     alert("사진을 등록하세요!")
  //   }
  // }
  // const onImgInputBtnClick = (e) => {
  //   e.preventDefault();
  //   logoImgInput.current.click();
  // }

  // const onImgChange = async (e) => {
  //   const formData = new FormData();
  //   formData.append('file', e.target.files[0]);
    
  //   dispatch(updateImage(currentUser.userId, formData))
  //   .then(() => {

  //   })
  //   .catch(() => {

  //   })
  // }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    console.log(formData);
   
    dispatch(updateImage(currentUser.userId, formData))
    .then(() => {

    })
    .catch((error) => {
      console.error(error);
    })
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <Box
      sx={{
        mt: '20px',
        width: '800px',
        border: '1px solid pink',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      
      {/* MY PAGE, 이미지 관리 */}
      <Paper elevation={0} sx={{ maxWidth: 800, pt: 4, pl: 5, pr:4 }}>
        <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', pb: 5 }}>
          <Typography variant='h4'>MY PAGE</Typography>
          <Avatar
            sx={{
              display: "flex",
              alignItems: "center",
              width: "150px",
              height: "150px",
              mt: "30px",
              mb: "30px",
            }}
            alt="user profilePhoto"
            src={data.profilePhoto}    
          />
            <label htmlFor="contained-button-file">
              <Input accept="image/*" id="contained-button-file" multiple type="file" />
              <Button component="span" sx = {{ alignItems: 'center', color: 'white', bgcolor: '#ff5f70', ':hover': { bgcolor: '#ffc0cb'} }}>
                사진 변경
              </Button>
            </label>
        </Box>      
      </Paper>

      {/* 첫 번째 칸 */}
      <Paper
        elevation={2}
        sx={{ width: 700, my: 1, mt: 4, p: 2 }}
      >
          <Stack direction="column" sx={{ my: 1, p: 1 }}>

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold"}}>닉네임</Typography>
              {updateNickname}
            </Stack>  

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>자기소개</Typography>
              {updateIntroduce}
            </Stack>

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>블로그 주소</Typography>
              {updateDomain}
            </Stack>

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>이메일 주소</Typography>
              <Typography sx={{ marginLeft: 5, p: 0.5 }}>{data.email}</Typography>
            </Stack>
            {updateButton}
            {cancleButton}
    
          </Stack>
      </Paper>

      {/* 두 번째 칸 */}
      <Paper
        elevation={2}
        sx={{ width: 700, my: 1, mt: 1, p: 2 }}
      >
          <Stack direction="column" sx={{ my: 1, p: 1 }}>

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>이웃 관리</Typography>
              <Typography sx={{ marginLeft: 7.5, p: 0.5 }}>3명</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Stack>

            <EtcButton size="small">이웃 관리</EtcButton>    

          </Stack>
      </Paper>

      {/* 세 번째 칸 */}
      <Paper
        elevation={2}
        sx={{ width: 700, my: 1, mt: 1, p: 2 }}
      >
          <Stack direction="column" sx={{ my: 1, p: 1 }}>

            <Stack direction='row' sx={{ my: 1, p: 1}}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>회원 탈퇴</Typography>
              <Box sx={{ flexGrow: 1 }} />
            </Stack>

            <EtcButton size="small" color="error">회원 탈퇴</EtcButton>
               
          </Stack>
      </Paper>
    </Box>
  );
}