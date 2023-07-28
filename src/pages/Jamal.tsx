import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonToast,
  IonModal,
  IonInput,
  IonAccordion,
  IonAccordionGroup,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import { useRef } from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { add, documentAttachSharp } from 'ionicons/icons';
import axios from 'axios';
import './Home.css';
import {
  RenderAccordionProps,
  AddButtonProps,
  Task,
} from './AddProps';

interface Props {
  days: any;
}

function RenderAccordion(props: RenderAccordionProps) {
  const baseURL = 'http://localhost/remind/api/';
  const mbaseURL = 'http://192.168.18.44:8100/remind/api/';
  const [datas, setData] = useState<any[]>([]);
  let { days, data } = props;

  const fetchD = async () => {
    console.log(data)
    try {
      const response = await axios.post(`${baseURL}tasks`);
      console.log(response.data);
      setData(response.data.payload)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const btnDone = async (p_id: any) => {
    try {
      const res = await axios.post(`${baseURL}updatetask`, {
        payload: { id: p_id },
      });
      console.log(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    fetchD();
  };

  const deleteTask = async (p_id: any) => {
    try {
      const res = await axios.post(`${baseURL}deletetask`, {
        payload: { id: p_id },
      });
      console.log(res);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    fetchD();
  };

  return (
    <>
      {datas == null ? (
        <p>No task available</p>
      ) : (
        <div>
          {datas.filter(
            (t) => t.fld_day.toLowerCase() == props.days.toLowerCase()
          ).length === 0 ? (
            <p>No task available.</p>
          ) : (
            datas
              .filter((t) => t.fld_day === props.days)
              .map((item) => (
                <div className="task" key={item.fld_id}>
                  <div className="top-part">
                    <p className="fld-title">{item.fld_title}</p>
                    <>
                      {item.fld_is_done == 0 ? (
                        <p className="due">
                          <span className="due">Created at: </span>
                          <span className="due-time">
                            {item.fld_datecreated}
                          </span>
                        </p>
                      ) : (
                        <p className="done">Done</p>
                      )}
                    </>
                  </div>
                  <div
                    className={
                      item.fld_is_done == 0
                        ? ' bottom-part'
                        : ' bottom-part done'
                    }
                  >
                    <IonButton
                      className={
                        item.fld_is_done == 0 ? '' : ' hidden'
                      }
                      onClick={() => btnDone(item.fld_id)}
                      color="dark"
                    >
                      DONE
                    </IonButton>
                    <IonButton
                      color="danger"
                      onClick={() => deleteTask(item.fld_id)}
                    >
                      DELETE
                    </IonButton>
                    <IonToast
                      message="Item deleted successfully."
                      duration={2000}
                    />
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </>
  );
}

function Home() {
  const [taskData, setTaskData] = useState<any[]>([]);
  const baseURL = 'http://localhost/remind/api/';
  const mbaseURL = 'http://192.168.18.44:8100/remind/api/';
  const day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${baseURL}tasks`);
      console.log(response.data.payload);
      setTaskData(response.data.payload);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1 className="app-name">
              <span className="grey">RE</span>MIND
            </h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1 className="tasks">Tasks</h1>
        <IonAccordionGroup expand="inset">
          <IonAccordion value="first">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Monday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[0]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="second">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Tuesday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[1]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="third">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Wednesday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[2]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="fourth">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Thursday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[3]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="fifth">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Friday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[4]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="sixth">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Saturday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[5]} data={taskData} />{' '}
            </div>
          </IonAccordion>

          <IonAccordion value="seventh">
            <IonItem className="accor" slot="header" color="light">
              <IonLabel className="day">Sunday</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <RenderAccordion days={day[6]} data={taskData} />{' '}
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
      <AddButton onTaskAdded={fetchData} />{' '}
    </IonPage>
  );
}

function AddButton({ onTaskAdded }: { onTaskAdded: () => void }) {
  const modal = useRef<HTMLIonModalElement>(null);
  const [sData, setD] = useState<any[]>([]);
  const [data, setData] = useState('');
  const [day, setDay] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const baseURL = 'http://localhost/remind/api/';
  const mbaseURL = 'http://192.168.18.44:8100/remind/api/';

  const createTask = async (p_day: any, p_title: any) => {
    try {
      const response = await axios.post(`${baseURL}createtask`, {
        payload: {
          day: p_day.toLowerCase(),
          title: p_title.toLowerCase(),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    dismiss();
    setIsOpen(true);
    setIsOpen(true);
    onTaskAdded();
  };

  function dismiss() {
    modal.current?.dismiss();
  }

  const handleChange1 = (event: any) => {
    setData(event.target.value);

    console.log('value is:', event.target.value);
  };
  const handleChange2 = (event: any) => {
    setDay(event.target.value);

    console.log('value is:', event.target.value);
  };

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton color="dark" id="open-modal">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={1}
        breakpoints={[0, 1]}
      >
        <div className="block create-task">
          <IonInput
            className="input input-title"
            label="Task"
            placeholder="Enter new task"
            onInput={handleChange1}
          ></IonInput>

          <IonInput
            className="input input-day"
            label="Day"
            placeholder="Monday, Tuesday..."
            onInput={handleChange2}
          ></IonInput>
          <div className="add-task-button">
            <IonButton
              type="submit"
              className="add-button"
              color="dark"
              onClick={() => {
                data == '' && day == ''
                  ? dismiss()
                  : createTask(day, data);
              }}
            >
              Add task
            </IonButton>
            <IonToast
              isOpen={isOpen}
              message={isOpen ? 'Task added!' : 'No task added!'}
              onDidDismiss={() => setIsOpen(false)}
              duration={2000}
            ></IonToast>
          </div>
        </div>
      </IonModal>
    </>
  );
}

export default Home;
