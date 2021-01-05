import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import { Button, Col, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Footer from '../../../component/common/footer/Footer';

class VodUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publishAsset: 'N',
      title: '',
      videoName: '',
      videoFile: '',
      videoType: '',
      response: '',
      isLoading: false,
      shortDescription: '',
      longDescription: '',
      category: '',
      subCategory: '',
      videoNameVal: '',
      uploadProgress: 0,
      uploading: false,
      validated: false,
      toster: false,
      //errors Var
      shortDescriptionError: false,
      longDescriptionError: false,
      titleError: false,
      categoryError: false,
      subCategoryError: false,
      videoNameError: false,
      imageUploadError: false,
      contentTypeValError: false,
      imageFiles: '',
      username1: '',
      contentTypeVal: '',
      genre_map: [],
      states: [],
      selectedCategory: '--Choose category--',
    };
    this.changeCategory = this.changeCategory.bind(this);
  }
  //Handle onchange event
  handleChangeValue = (event) => {
    if (event.target.name === 'title') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          titleError: true,
        });
      } else {
        this.setState({
          titleError: false,
          title: event.target.value,
        });
      }
    }
    if (event.target.name === 'publishAsset') {
      let publishChecked = event.target.checked;
      if (publishChecked) {
        this.setState({
          publishAsset: 'Y',
        });
      }
    }
    if (event.target.name === 'longDescription') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          longDescriptionError: true,
        });
      } else {
        this.setState({
          longDescriptionError: false,
          longDescription: event.target.value,
        });
      }
    }
    if (event.target.name === 'contentTypeVal') {
      if (event.target.value === '' || event.target.value === null) {
        this.setState({
          contentTypeValError: true,
        });
      } else {
        this.setState({
          contentTypeValError: false,
          contentTypeVal: event.target.value,
        });
      }
    }
    if (event.target.name === 'subCategory') {
      this.setState({
        subCategory: event.target.value,
      });
    }
    if (event.target.name === 'assetImgUpload') {
      if (event.target.files[0] === '' || event.target.files[0] === null) {
        this.setState({
          imageUploadError: true,
        });
      } else {
        this.setState({
          imageUploadError: false,
          imageFiles: event.target.files[0],
        });
      }
    }
  };
  //Handle Video Uplod File
  handleVideoChangeValue = (event) => {
    const fileValue = event.target.files[0];
    if (fileValue === '' || fileValue === null) {
      this.setState({
        videoNameError: true,
      });
    } else {
      this.setState({
        videoNameError: false,
        videoFile: fileValue,
        videoName: fileValue.name,
        videoType: fileValue.type,
      });
    }
  };

  changeCategory(event) {
    if (event.target.value === '' || event.target.value === null) {
      this.setState({
        categoryError: true,
        states: [],
      });
    } else {
      this.setState({
        categoryError: false,
        category: event.target.value,
      });
      this.setState({
        states: this.state.genre_map.find(
          (cntry) => cntry.primary_genre_id === event.target.value
        ).associated_secondary_genre,
      });
    }
  }

  backToDashboard = () => {
    this.props.history.push('/');
  };
  //Submit Form
  uploadAssetData = (e) => {
    var getUserInformation = localStorage.getItem(
      'CognitoIdentityServiceProvider.1gqmvf15e1ljdu60go2udsu492.LastAuthUser'
    );
    const {
      title,
      publishAsset,
      longDescription,
      category,
      subCategory,
      videoName,
      videoFile,
      videoType,
      imageFiles,
      contentTypeVal,
    } = this.state;

    if (title === '') {
      this.setState({ titleError: true });
    }
    if (contentTypeVal === '') {
      this.setState({ contentTypeValError: true });
    }
    /*  if (shortDescription === '') {
      this.setState({ shortDescriptionError: true });
    } */
    if (longDescription === '') {
      this.setState({ longDescriptionError: true });
    }
    if (category === '') {
      this.setState({ categoryError: true });
    }
    /*  if (subCategory === '') {
      this.setState({ subCategoryError: true });
    } */
    if (imageFiles === '') {
      this.setState({ imageUploadError: true });
    }
    if (videoName === '') {
      this.setState({ videoNameError: true });
      return false;
    } else {
      this.setState({
        videoNameError: false,
      });
    }
    if (
      title !== '' &&
      contentTypeVal !== '' &&
      longDescription !== '' &&
      category !== '' &&
      videoName !== '' &&
      imageFiles !== ''
    ) {
      //Create Json File
      let imageType = imageFiles.type;
      let imageName = imageFiles.name;
      let imageNameStr = imageName.split('.')[0];
      let imageNameType = imageName.split('.')[1];
      let videoNameStr = videoName.split('.')[0];
      let videoNameType = videoName.split('.')[1];
      //Update fileName with current DateTime
      const currentDatetime = moment().format('YYYY-MM-DDTHH:mm:ss');
      //updated Image name
      let imageCurrentDateTime =
        imageNameStr + '_' + currentDatetime + '.' + imageNameType;
      console.log(imageCurrentDateTime);
      //updated Video name
      let videoCurrentDateTime =
        videoNameStr + '_' + currentDatetime + '.' + videoNameType;
      //Creating JSON file name
      var createFileName = 'jsonuploader/jsonFile-' + videoNameStr + '.json';
      //Creating JSON object
      let jsonData = JSON.stringify({
        title: title,
        description: longDescription,
        primaryGenre: category,
        secondaryGenre: subCategory,
        videoName: videoName,
        imageName: imageName,
        updatedVideoName: videoCurrentDateTime,
        updatedImageName: imageCurrentDateTime,
        userName: getUserInformation,
        publishAsset: publishAsset,
        contentType: contentTypeVal,
        currentDateTime: currentDatetime,
      });
      console.log(jsonData);
      //Image Upload
      Storage.put(`${'videoImages/' + imageCurrentDateTime}`, imageFiles, {
        customPrefix: {
          public: '',
        },
        contentType: imageType,
      })
        .then((result) => {
          console.log('result: ', result);
        })
        .catch((err) => {
          this.setState({
            toster: true,
          });
          toast.error(`Cannot uploading Image file: ${err} please try again`, {
            position: 'top-right',
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });

      //Video Upload
      const videoVal = this;
      this.setState({ uploading: true });
      Storage.put(`${videoCurrentDateTime}`, videoFile, {
        customPrefix: {
          public: '',
        },
        progressCallback(progress) {
          let prog = parseInt((progress.loaded / progress.total) * 100);
          //console.log(prog + '%');
          videoVal.setState({ uploadProgress: prog + '%' });
        },
        contentType: videoType,
      })
        .then((result) => {
          this.setState({ uploading: false });
          this.setState({
            toster: true,
          });
          toast.success('File Uploaded Succesfully', {
            position: 'top-right',
            autoClose: 3000,
          });
          //upload json
          Storage.put(`${createFileName}`, `${jsonData}`, {
            customPrefix: {
              public: '',
            },
          })
            .then((result) => {
              console.log('json result: ', result);
            })
            .catch((err) => {
              this.setState({
                toster: true,
              });
              toast.error(`Cannot uploading file: ${err}`, {
                position: 'top-right',
                autoClose: 4000,
              });
            });
          //document.getElementById('dataForm').reset();
          setTimeout(() => {
            //window.location.reload();
            this.setState({
              title: '',
              publishAsset: '',
              longDescription: '',
              category: '',
              subCategory: '',
              videoName: '',
              videoFile: '',
              videoType: '',
              imageFiles: '',
              contentTypeVal: '',
            });
          }, 3000);
        })
        .catch((err) => {
          this.setState({
            toster: true,
          });
          toast.error(`Cannot uploading Video file: ${err} please try again`, {
            position: 'top-right',
            autoClose: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    }
  };
  componentDidMount() {
    this.setState({
      genre_map: [
        {
          primary_genre_name: 'CEO Videos',
          primary_genre_id: '058b1851-f6b2-42cc-b16d-8edfc479e77e',
          primary_genre_seq_id: '0',
          associated_secondary_genre: [],
        },
        {
          primary_genre_name: 'Corporate Videos',
          primary_genre_id: '03f62792-97a9-4a26-891c-c99ab7025858',
          primary_genre_seq_id: '0',
          associated_secondary_genre: [],
        },
        {
          primary_genre_name: 'Learning Videos',
          primary_genre_id: '0e26f445-bd63-4aba-ac67-04e03d92422f',
          primary_genre_seq_id: '0',
          associated_secondary_genre: [
            {
              secondary_genre_name: 'ILP Videos',
              secondary_genre_id: '0eb7a3f3-4556-4556-b1c3-6f921d0acfa3',
            },
            {
              secondary_genre_name: 'CLP Videos',
              secondary_genre_id: '1029f4c7-fcd6-449b-8084-d474ab8cbfec',
            },
            {
              secondary_genre_name: 'LDP Videos',
              secondary_genre_id: '175b9b0a-4d06-4671-8880-893ec8fce2d7',
            },
          ],
        },
      ],
    });
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='outer'>
            <div className='inner'>
              <h3>VOD UPLOAD</h3>
              <Button
                variant='secondary'
                onClick={this.backToDashboard}
                className='button-aline'
              >
                Back
              </Button>
              <Form
                validated={this.state.validated}
                onSubmit={this.uploadAssetData}
                id='dataForm'
              >
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type='text'
                      name='title'
                      placeholder='Title'
                      onChange={this.handleChangeValue}
                      autoComplete='off'
                      required
                    />
                    {this.state.titleError ? (
                      <span className='form-error'>Please Enter Title</span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='form-marigin-left'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      name='longDescription'
                      placeholder='Description'
                      onChange={this.handleChangeValue}
                      autoComplete='off'
                      required
                    />
                    {this.state.longDescriptionError ? (
                      <span className='form-error'>
                        Please Enter Description
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='select'
                      name='category'
                      onChange={this.changeCategory}
                      required
                    >
                      <option value=''>Select</option>
                      {this.state.genre_map.map((e, key) => {
                        return (
                          <option key={key} value={e.primary_genre_id}>
                            {e.primary_genre_name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    {this.state.categoryError ? (
                      <span className='form-error'>Please Select Category</span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='form-marigin-left'>
                    <Form.Label>Sub Category</Form.Label>
                    <Form.Control
                      as='select'
                      name='subCategory'
                      onChange={this.handleChangeValue}
                    >
                      <option value=''>Select</option>
                      {this.state.states.map((e, key) => {
                        return (
                          <option key={key} value={e.secondary_genre_id}>
                            {e.secondary_genre_name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Thumbnail Image</Form.Label>
                    <Form.File
                      name='assetImgUpload'
                      type='file'
                      accept='image/*'
                      onChange={this.handleChangeValue}
                      required
                    />
                    {this.state.imageUploadError ? (
                      <span className='form-error'>
                        Please Choose Image File For Upload
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='form-marigin-left'>
                    <Form.Label>Video</Form.Label>
                    {this.state.uploading && (
                      <div
                        className='progress'
                        style={{ marginBottom: '10px' }}
                      >
                        <div
                          className='progress-bar'
                          role='progressbar'
                          style={{ width: this.state.uploadProgress }}
                          aria-valuenow={this.state.uploadProgress}
                          aria-valuemin='0'
                          aria-valuemax='100'
                        >
                          {this.state.uploadProgress}
                        </div>
                      </div>
                    )}
                    <Form.File
                      name='assetUpload'
                      type='file'
                      accept='video/*'
                      onChange={this.handleVideoChangeValue}
                      required
                    />
                    {this.state.videoNameError ? (
                      <span className='form-error'>
                        Please Choose Video File For Upload
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>Content Type</Form.Label>
                    <Form.Control
                      as='select'
                      name='contentTypeVal'
                      onChange={this.handleChangeValue}
                      required
                    >
                      <option value=''>Select</option>
                      <option value='TVSHOW'>TV Shows</option>
                      <option value='MOVIE'>Movies</option>
                    </Form.Control>
                    {this.state.contentTypeValError ? (
                      <span className='form-error'>
                        Please Select Content Type
                      </span>
                    ) : (
                      ''
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className='form-marigin-left'>
                    <Form.Label></Form.Label>
                    <Form.Check
                      type='checkbox'
                      name='publishAsset'
                      label='Publish Asset'
                      onChange={this.handleChangeValue}
                    />
                  </Form.Group>
                </Form.Row>

                {this.state.toster && (
                  <ToastContainer
                    position='top-right'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                )}
                {/*  {this.state.toster && <Toster />} */}
                <Button
                  variant='secondary'
                  style={{ marginTop: '10px' }}
                  onClick={this.uploadAssetData}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default withRouter(VodUpload);
