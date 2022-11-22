import React from 'react'
import { useEffect , useState} from 'react';
import Page from '../../components/Page/Page';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';

import { Gantt } from 'gantt-task-react';

import "./GanttPage.css";
import "gantt-task-react/dist/index.css";

const GanttPage = () => {
    const {actProject} = useProject();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await request.get(`${actProject.value}/task/`)
            if(res.data !== "Failure") {
                console.log(res.data);
                setTasks(res.data);
            }
        };
        fetchTasks();
    }, [actProject]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks])

    return (
        <Page title="Gantt Chart" className="page-container">
            { tasks.length !== 0 ? <Gantt tasks={tasks.map(task => ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: 33, 
                isDisabled: true,  
                styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }}))}/> : <></> }
        </Page>
    )
}

export default GanttPage