import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './ProjectTree.css';

const ProjectTree = () => {
  const [treeData, setTreeData] = useState([
    { title: 'Project', root: true, children: [
      { title: 'Frontend' , children: [{title : "UI"}]},
      { title: 'Backend' , children: [{title : "Authentication"}]}
    ] }
  ])

  useEffect(() => {
    //console.log(treeData);
  });

  return (
    <Page title="Project tree" noCard>
        <SortableTree
          treeData={treeData}
          onChange={((treeData) => {setTreeData(treeData)})}
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
              <button className="bar-btn"><CircularProgressbar value={0.66} maxValue={1} text="66%"/></button>,
            ]
          })}
        />
    </Page>
  )
}

export default ProjectTree