import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

const ProjectTree = () => {
  const [treeData, setTreeData] = useState([
    { title: 'Project', children: [
      { title: 'Frontend' , children: [{title : "UI"}]},
      { title: 'Backend' , children: [{title : "Authentication"}]}
    ] }
  ])

  useEffect(() => {
    console.log(treeData);
  });

  return (
    <Page title="Project tree" noCard>
        <SortableTree
          treeData={treeData}
          onChange={((treeData) => {setTreeData(treeData)})}
          isVirtualized={false}
        />
    </Page>
  )
}

export default ProjectTree