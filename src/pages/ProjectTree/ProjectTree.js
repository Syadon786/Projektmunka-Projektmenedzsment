import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './ProjectTree.css';
import '../../styles/ProjectTree.css';

const ProjectTree = ({actProject}) => {
  const [treeData, setTreeData] = useState([
    { title: 'Project', root: true, children: [
      { title: 'Frontend' , children: [{title : "UI"}]},
      { title: 'Backend' , children: [{title : "Authentication"}]}
    ] }
  ])

  const demoDrawTreeDataState = (data) => {
    return(
      <ol>{
         data.map(node => {
            if(node.children)
              return <li key={node.title}>{node.title}<ol>{demoDrawTreeDataState(node.children)}</ol></li>          
            else return <li key={node.title}>{node.title}</li>            
         })
        }
      </ol>
    );
  }

  useEffect(() => {
    console.dir(treeData);
  }, [treeData]);

  useEffect(() => {
    setTreeData([
      { title: actProject.label, root: true, children: [
        { title: 'Frontend' , children: [{title : "UI"}]},
        { title: 'Backend' , children: [{title : "Authentication"}]}
      ] }
    ]);
  }, [actProject]);

  

  return (
    <Page title={actProject.label} noCard>
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
              <button className="bar-btn"><CircularProgressbar className='bar' value={0.66} maxValue={1} text="66%"/></button>,
            ]
          })}
        />
        <div className="DEMO card mt-4 p-4">TreeData state: csak hogy monitorozni lehessen fejlesztés közben a TreeData objektum felépítését
          {demoDrawTreeDataState(treeData)}
        </div>
    </Page>
  )

 
}

export default ProjectTree