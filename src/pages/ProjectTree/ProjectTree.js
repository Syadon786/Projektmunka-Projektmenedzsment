import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree, { toggleExpandedForAll } from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Button from '../../components/Button/Button';

import hash from 'object-hash'

import './ProjectTree.css';
import '../../styles/ProjectTree.css';

const ProjectTree = ({actProject}) => {
  const [treeData, setTreeData] = useState([
    { title: actProject.label, root: true,  children: [
      { title: 'Frontend' , children: [{title : "UI", expanded: false}], expanded: false},
      { title: 'Backend' , children: [{title : "Authentication", expanded: false,}], expanded: false}
    ], expanded: false}
  ]);

  const [oldTreeData, setOldTreeData] = useState([
    { title: actProject.label, root: true,  children: [
      { title: 'Frontend' , children: [{title : "UI", expanded: false}], expanded: false},
      { title: 'Backend' , children: [{title : "Authentication", expanded: false,}], expanded: false}
    ], expanded: false}
  ]);

  const [oldStateHash, setOldStateHash] = useState("");
  const [newStateHash, setNewStateHash] = useState("");

  useEffect(() => {
    setNewStateHash(hash(treeData[0]));
    console.dir(treeData[0])
  }, [treeData]);

  useEffect(() => {
     setOldStateHash(hash(oldTreeData[0]));
  }, [oldTreeData])

  useEffect(() => {
    setTreeData([
      { title: actProject.label, root: true,  children: [
        { title: 'Frontend' , children: [{title : "UI", expanded: false}], expanded: false},
        { title: 'Backend' , children: [{title : "Authentication", expanded: false,}], expanded: false}
      ], expanded: false}
    ]);

    setOldTreeData([
      { title: actProject.label, root: true,  children: [
        { title: 'Frontend' , children: [{title : "UI", expanded: false}], expanded: false},
        { title: 'Backend' , children: [{title : "Authentication", expanded: false,}], expanded: false}
      ], expanded: false}
    ]);
  }, [actProject]);

  return (
    <Page title={actProject.label} noCard>
          {(oldStateHash !== newStateHash) ? 
          <>
          {/* <Button onClick={() => {setTreeData(toggleExpandedForAll({treeData: treeData, expanded: false}))}}>Collapse all</Button> */}
          <Button>Save changes</Button>
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
            ]
          })}
        />

        <div>Eredeti állapot: {oldStateHash}</div>
        <div>Új állapot: {newStateHash}</div>

    </Page>
  )

 
}

export default ProjectTree