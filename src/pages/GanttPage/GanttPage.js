import React from 'react'
import Page from '../../components/Page/Page';
import { useProject } from '../../contexts/ProjectContext';
import { Gantt} from 'gantt-task-react';

import "gantt-task-react/dist/index.css";
import { useEffect } from 'react';

const GanttPage = () => {
    const {tasks, progressMap, setRefreshProgress} = useProject();

    useEffect(() => {
        setRefreshProgress(prev => !prev);
    }, [setRefreshProgress])

    return (
        <Page title="Gantt Chart">
            { tasks.length !== 0 && progressMap.length > 0 ? <Gantt listCellWidth='' ganttHeight="75vh" columnWidth="60" todayColor='#aab5b9' 
            barProgressColor='#3e97c7' barProgressSelectedColor='#61dafb'
            tasks={tasks.map(task => { 
                const progress = progressMap.find(p => p.id === task._id).progress
                if(progress === 100) {
                    return ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: progress, 
                        isDisabled: true,
                        type: 'task',  
                    styles: { progressColor: '#379237', progressSelectedColor: '#54B435' }})
                }
                else if(new Date(task.endDate) <= new Date()) {
                    return ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: progress, 
                        isDisabled: true,
                        type: 'task',  
                    styles: { progressColor: '#b82828', progressSelectedColor: '#e83333' }})
                }
                return ({start: new Date(task.startDate), end: new Date(task.endDate), name: task.title, id: task._id, progress: progress, 
                isDisabled: true,
                type: 'task',  
                })})}/> 
                : <></> }
        </Page>
    )
}   

export default GanttPage