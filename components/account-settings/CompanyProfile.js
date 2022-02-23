import * as React from "react";
import layout from "../../styles/layout.module.scss";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { ModalBox } from "../../components/tableControls.style";
import "react-image-crop/dist/ReactCrop.css";
import tokenExpired from "../layout/withAuth/tokenExpired";
import { toast } from "react-toastify";
import axios from "axios";
import { Form, Formik } from "formik";
import { validationSchema } from "../../validators/companyProfile.validators";
import {
  ErrorMsg,
  MainButton,
  OutlineButton,
  InputText,
} from "../formControls.style";
import Loader from "../Loader";
import ReactCrop from "react-image-crop";
import Image from "next/image";
import { CompanyProfileBox,CompanyUploadFile } from "../../components/account-settings/AccountSetting.style";
import { useRouter } from "next/router";
import { object } from "yup";

const CompanyProfile = () => {
  // const [profile,setProfile] = React.useState(null)
  const [bigLogo, setBigLogo] = React.useState("/full-logo.png");
  const [open, setOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState("");
  const [crop, setCrop] = React.useState({ aspect: 3 / 2 });
  const [result, setResult] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [image, setImage] = React.useState(null);
  const [small, setSmall] = React.useState(false);
  const [companyName, setCompanyName] = React.useState("");
  const [smallLogo, setSmallLogo] = React.useState("/icon-logo.png");
  const ref = React.useRef();
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(null);
  const [smallLogoFile, setSmallLogoFile] = React.useState(null);
  const [bigLogoFile, setBigLogoFile] = React.useState(null);
  const [imgFile, setImgFile] = React.useState(null);
  const [smallLogoUrl, setSmallLogoUrl] = React.useState("");
  const [bigLogoUrl, setBigLogoUrl] = React.useState("");

  const [SaveOpen, setSaveOpen] = React.useState(false);
  const handleSaveChangeOpen = () => setSaveOpen(true);
  const handleSaveClose = () => setSaveOpen(false);
  const router = useRouter();

  const getCroppedImg = () => {
    function makeid(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    if (!crop.height && !crop.width) {
      if (small) {
        setSmallLogo(selectedImg);
        if (imgFile) {
          var file = imgFile;
          var blob = file.slice(0, file.size, "image/png");
          const newFile = new File([blob], `${makeid(10)}.png`, {
            type: "image/png",
          });
          imgFile && setSmallLogoFile(newFile);
          imgFile && uploadCompanyLogo(newFile);
        }
        setSelectedImg("");
        setImgFile(null);
        setSmall(false);
      } else {
        setBigLogo(selectedImg);
        if (imgFile) {
          var file = imgFile;
          var blob = file.slice(0, file.size, "image/png");
          const newFile = new File([blob], `${makeid(10)}.png`, {
            type: "image/png",
          });
          imgFile && setBigLogoFile(newFile);
          imgFile && uploadCompanyLogo(newFile);
        }
        setSelectedImg("");
        setImgFile(null);
      }
    } else {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/png", 1.0);
      console.log(base64Image);
      console.log(typeof base64Image);

      function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
      }
      if (small) {
        setSmallLogo(base64Image);
        var file = dataURLtoFile(base64Image, makeid(10));
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl);
        setSmallLogoFile(file);
        uploadCompanyLogo(file);
        console.log(file);
        setSelectedImg("");
        setSmall(false);
        setImgFile(null);
        handleClose();
      } else {
        var file = dataURLtoFile(base64Image, makeid(10));
        console.log(file);
        setBigLogoFile(file);
        uploadCompanyLogo(file);
        const newUrl = URL.createObjectURL(file);
        console.log(newUrl);
        setBigLogo(base64Image);
        setSelectedImg("");
        setImgFile(null);
        handleClose();
      }
      setSelectedImg("");
      console.log(result);
      console.log(crop);
      setImgFile(null);
      handleClose();
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const clearValue = () => {
    ref.current.value = "";
  };

  const getProfile = async () => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    console.log(authDetails);
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      setLoading(true);

      try {
        const response = await axios({
          method: "get",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user?userId=${userId}`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log(response.data.data);
        setProfile(response.data.data);
        response.data.data.companyName &&
          setCompanyName(response.data.data.companyName);
        response.data.data.companyLogo
          ? setBigLogo(response.data.data.companyLogo)
          : setBigLogo("/full-logo.png");
        response.data.data.smallCompanyLogo
          ? setSmallLogo(response.data.data.smallCompanyLogo)
          : setSmallLogo("/icon-logo.png");
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  const uploadCompanyLogo = async (file) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      console.log(file);
      console.log(jwt);
      console.log(userId);
      const dataForm = new FormData();
      dataForm.append("userId", userId);
      dataForm.append("type", "company");
      dataForm.append("file", file);
      setLoading(true);
      try {
        const response = await axios({
          method: "POST",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          data: dataForm,
        });
        console.log(response.data.data);
        response.data.data && setImgFile(null);
        if (small) {
          setSmallLogoUrl(response.data.data);
        } else {
          setBigLogoUrl(response.data.data);
        }
        if (response && response.data) {
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
  };

  const handleSave = async (val) => {
    const authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (authDetails) {
      const { jwt, userId, orgId } = authDetails;
      console.log(jwt, userId, orgId);
      console.log(bigLogo);
      console.log(smallLogo, "small");
      console.log(bigLogo, "big");
      setLoading(true);
      console.log(companyName);
      try {
        const response = await axios({
          method: "put",
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-company-profile`,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          data: {
            userId: userId,
            orgId: orgId,
            companyName: val,
            companyLogo: bigLogoUrl ? `${bigLogoUrl}` : bigLogo,
            smallCompanyLogo: smallLogoUrl ? `${smallLogoUrl}` : smallLogo,
          },
        });
        console.log(response, "res");
        if (response && response.data) {
          getProfile();
          toast.success(response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } catch (err) {
        tokenExpired(err, router);
      }
      setLoading(false);
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <>
      <Loader loading={loading} />
      <CompanyProfileBox>
        <Formik
          enableReinitialize
          initialValues={{ companyName: companyName }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSave(values.companyName);
          }}
        >
          {({
            touched,
            errors,
            values,
            handleBlur,
            handleChange,
            setFieldValue,
            resetForm,
          }) => (
            <Form>
              <h3>Company Profile</h3>
              <div
                className={`${layout.mt_20} ${layout.mb_30}`}
                style={{ width: "50%" }}
              >
                <InputLabel htmlFor="password">Company Name</InputLabel>
                <InputText
                  size="small"
                  name="companyName"
                  id="CompanyName"
                  type="text"
                  placeholder="Enter Company Name"
                  value={companyName}
                  onChange={handleChange}
                  value={values.companyName}
                  onBlur={handleBlur}
                  error={touched.companyName && Boolean(errors.companyName)}
                />
                <ErrorMsg name="companyName"></ErrorMsg>
              </div>

              <h3>Main Menu logo</h3>
              <p className="notes">
                <Image
                  alt="Icon"
                  width="14"
                  height="14"
                  src="/icons/notes.svg"
                />{" "}
                <span className={layout.ml_5}>
                  Recommended: PNG with transparent background
                </span>
              </p>
              <div className={layout.flex_top}>
                {/*  Icon logo */}
                <div
                  className="logo_wrap"
                  onClick={() => {
                    handleOpen();
                    setSmall(true);
                    setSelectedImg(smallLogo);
                  }}
                >
                  {smallLogo && (
                    <Image
                      crossOrigin="anonymous"
                      src={smallLogo}
                      alt="Logo Icon"
                      width="48"
                      height="48"
                    />
                  )}
                  <p className="size">48x48px</p>
                  {/* hover section */}
                  <div className="logo_hover">
                    <div className="change_img">
                      <Image
                        alt="Icon"
                        width="20"
                        height="20"
                        src="/icons/edit-pen-icon.svg"
                      />
                    </div>
                    {smallLogo !== "/icon-logo.png" && (
                      <div
                        className="delete_img"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSmallLogo("/icon-logo.png");
                          setSmallLogoUrl("");
                        }}
                      >
                        <Image
                          alt="Icon"
                          width="14"
                          height="14"
                          src="/icons/delete-icon2.svg"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/*  main logo */}
                <div
                  className="main_logo_wrap"
                  onClick={() => {
                    handleOpen();
                    setSmall(false);
                    setSelectedImg(bigLogo);
                  }}
                >
                  {bigLogo && (
                    <Image
                      crossOrigin="anonymous"
                      src={bigLogo}
                      alt="Logo Image"
                      width="200"
                      height="48"
                    />
                  )}
                  <p className="size">200x48px</p>
                  {/* hover section */}
                  <div className="main_logo_hover">
                    <div className="change_img">
                      <Image
                        alt="Icon"
                        width="20"
                        height="20"
                        src="/icons/edit-pen-icon.svg"
                      />
                      <span className={layout.mt_5}>Change Logo</span>
                    </div>
                    {bigLogo !== "/full-logo.png" && (
                      <div
                        className="delete_img"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBigLogo("/full-logo.png");
                          setBigLogoUrl("");
                        }}
                      >
                        <Image
                          alt="Icon"
                          width="14"
                          height="14"
                          src="/icons/delete-icon2.svg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* </div>
        </div> */}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <ModalBox style={{ minWidth: "400px" }}>
                    <span className={layout.model_close} onClick={handleClose}>
                      <Image
                        src="/icons/cancel.svg"
                        height="12"
                        width="12"
                        alt=""
                      />
                    </span>
                    <h3>Edit Menu Logo</h3>
                    <CompanyUploadFile>
                    <label className="file_upload" for="LogoUpload">
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setSelectedImg(
                            URL.createObjectURL(e.target.files[0])
                          );
                          setImgFile(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }}
                        ref={ref}
                      />
                    </label>
                    <div className="icon_wrap">
                      <div
                        className="upload_img"
                        onClick={() => ref.current.click()}
                      >
                        <Image
                          alt="Icon"
                          width="14"
                          height="14"
                          src="/icons/upload-img.svg"
                        />
                      </div>
                      {imgFile && (
                        <div
                          className="delete_img"
                          onClick={() => {
                            setSelectedImg(small ? smallLogo : bigLogo);
                            clearValue();
                            setImgFile(null);
                          }}
                        >
                          <Image
                            alt="Icon"
                            width="14"
                            height="14"
                            src="/icons/delete-icon2.svg"
                          />
                        </div>
                      )}
                    </div>
                    {selectedImg && (
                      <>
                        {" "}
                        <div
                          style={{
                            minHeight: "250px",
                            minWidth: "310px",
                            display: "flex",
                            justifyContent: " center",
                            alignItems: " center",
                            background:"#c1c1c1c"
                          }}
                        >
                          <ReactCrop
                            crossorigin="anonymous"
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            src={selectedImg}
                            onImageLoaded={setImage}
                            className="crop-image"
                          />
                        </div>
                        <div
                          className={`${layout.flex_center} ${layout.mt_30}`}
                        >
                          <span
                            className={`${layout.mr_10}`}
                            style={{ width: "50%" }}
                          >
                            <OutlineButton
                              onClick={() => {
                                small && setSmall(false);
                                setImgFile(null)
                                setCrop({ aspect: 3 / 2 })
                                handleClose();
                              }}
                              variant="text"
                              marginbottom="0"
                            >
                              <Image
                                alt="Icon"
                                width="14"
                                height="14"
                                src="/icons/cancel-icon.svg"
                              />
                              <span className={layout.ml_10}>Cancel</span>
                            </OutlineButton>
                          </span>
                          <span
                            className={`${layout.ml_10}`}
                            style={{ width: "50%" }}
                          >
                            <MainButton
                              onClick={() => {
                                getCroppedImg();
                                setCrop({ aspect: 3 / 2 })
                                handleClose();
                              }}
                              variant="contained"
                              marginbottom="0"
                            >
                              <Image
                                alt="Icon"
                                width="16"
                                height="16"
                                src="/icons/save-icon-white.svg"
                              />
                              <span className={layout.ml_10}>Save</span>
                            </MainButton>
                          </span>
                        </div>
                      </>
                    )}
                    </CompanyUploadFile>
                  </ModalBox>
                </Fade>
              </Modal>
              {/* <Image src={result} alt="cropped image" /> */}
              {/* <MainButton fixwidth="auto" variant="contained" marginbottom="0">
              <Image
                alt="Icon"
                width="16"
                height="16"
                src="/icons/save-icon-white.svg"
              />
              <span className={layout.ml_10}>Change Menu Logo</span>
            </MainButton> */}
              <MainButton
                className={layout.mt_20}
                marginbottom="0"
                type="submit"
                fixwidth="auto"
                variant="contained"
                disabled={
                  profile &&
                  bigLogo == profile.companyLogo &&
                  smallLogo == profile.smallCompanyLogo &&
                  values.companyName == profile.companyName
                }
              >
                <Image
                  alt="Icon"
                  width="16"
                  height="16"
                  src="/icons/save-icon-white.svg"
                />
                <span className={layout.ml_10}>Save Details</span>
              </MainButton>
            </Form>
          )}
        </Formik>
      </CompanyProfileBox>
    </>
  );
};
export default CompanyProfile;
