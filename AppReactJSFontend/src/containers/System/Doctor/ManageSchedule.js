import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, dateFormat } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { saveScheduleDocter } from '../../../services/userService'



class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],
        })
    }

    async componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let Object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object)
            })

        }

        return result;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }


            this.setState({
                rangeTime: data
            })
        }



        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );

        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }

    };


    // handleChangeSelect = async (selectedOption) => {
    //     this.setState({
    //         selectedDoctor: selectedOption
    //     })
    // }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        let result = [];


        if (!currentDate || _.isEmpty(selectedDoctor)) {
            toast.error(`⚠  - Lưu lịch khám thất bại!`)
        }

        let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);

                })

                toast.success('Lưu lịch khám thành công!')

            } else {
                toast.error("Lưu lịch khám thất bại!")
            }
        }
        
        let res = await saveScheduleDocter({
            arrSchedule: result
        })
        console.log('check resutl 2: ', res)


        console.log('check resutl: ', result)


    }


    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })

            this.setState({
                rangeTime: rangeTime

            })
        }
    }


    render() {
        let { rangeTime } = this.state
        return (
            <div className='manage-schedule-container'>
                <div className='title-manage'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label className='pb-2'>Nha sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}

                            />
                        </div>

                        <div className='col-6 form-group'>
                            <label className='pb-2'>Ngày khám</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className=' timepicker-container'>
                            {
                                rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button type="button"
                                            className={item.isSelected === true ? "btn btn-secondary col-1 m-4 " : "btn btn-outline-secondary col-1 m-4 "}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.valueVI}
                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className='col-12'>
                            <button type="button"
                                className="btn btn-outline-success col-1 mt-3"
                                onClick={() => this.handleSaveSchedule()}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
