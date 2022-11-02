import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Button from '../../components/Button/Button';

import hash from 'object-hash'

import './ProjectTree.css';
import '../../styles/ProjectTree.css';
import { useProject} from '../../contexts/ProjectContext';
import TaskModal from '../../components/TaskModal/TaskModal';
import request from '../../util/request';

// [
//   { title: actProject.label, root: true,  children: [
//     { title: 'Frontend' , children: [{title : "UI", expanded: false}], expanded: false},
//     { title: 'Backend' , children: [{title : "Authentication", expanded: false,}], expanded: false}
//   ], expanded: false}
// ]

const ProjectTree = () => {
  const {actProject, projectTreeData} = useProject();
  const [treeData, setTreeData] = useState([{}]);

  const [oldTreeData, setOldTreeData] = useState([{}]);

  const [oldStateHash, setOldStateHash] = useState("");
  const [newStateHash, setNewStateHash] = useState("");
  const [actRowInfo, setActRowInfo] = useState(0);

  const handleUpdate = async () => {
      const res = await request.patch(`/project/${actProject.value}`, {
        treeData: treeData
      });
      if(res.data === "Success") {
        setOldTreeData(treeData);
      }
  }

  useEffect(() => {
    setNewStateHash(hash(treeData[0]));
    //console.dir(treeData[0])
  }, [treeData]);

  useEffect(() => {
     setOldStateHash(hash(oldTreeData[0]));
  }, [oldTreeData])

  useEffect(() => {
      setTreeData(projectTreeData);
      setOldTreeData(projectTreeData);
  }, [actProject, projectTreeData])

  return (
    <Page title={actProject.label} noCard>
          {(oldStateHash !== newStateHash) ? 
          <>
          {/* <Button onClick={() => {setTreeData(toggleExpandedForAll({treeData: treeData, expanded: false}))}}>Collapse all</Button> */}
          <Button onClick={handleUpdate}>Save changes</Button>
          <Button className="ms-2" color="secondary" onClick={() => setTreeData(oldTreeData)}>Cancel changes</Button>
          </>
           : null}
        <SortableTree
          treeData={treeData}
          onChange={((prevData) => {setTreeData(prevData)})}
          isVirtualized={false}
          canDrag={({treeIndex}) => {if(treeIndex !== 0) 
                                          return true;
                                     return false;     
                                    }}
          canDrop={({nextPath}) => {if(nextPath.length === 1) 
                                    return false;
                                    return true;
          
          }}                
          generateNodeProps={(rowInfo) => ({
            buttons: [
              <button className="bar-btn"><CircularProgressbar className='bar' value={0.66} maxValue={1} text="66%"/></button>,
              <button className="add-btn" data-bs-toggle="modal" data-bs-target="#taskModal"
                  onClick={() => {         
                    setActRowInfo(rowInfo)
                  }}
                >
                 <i className="bi bi-plus-circle"></i>
                </button>
            ]
          })}
        />

        <div>Eredeti állapot: {oldStateHash}</div>
        <div>Új állapot: {newStateHash}</div>
        <TaskModal title="Create a New Task" treeData={treeData} rowInfo={actRowInfo} setTreeData={setTreeData}/>
    </Page>
  )

 
}

export default ProjectTree