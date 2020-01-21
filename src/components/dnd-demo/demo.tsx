import React from 'react';
import v4 from 'uuid/v4';
import Container from "./container";
import styled from "styled-components";
import update from "immutability-helper";

class Demo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...data
    };

    this.updateTasksList = this.updateTasksList.bind(this);
  }

  updateTasksList(updatedTasks: any) {
    this.setState({
      tasks: updatedTasks
    })
  };

  render() {
    const { containers, tasks } = this.state;

    const moveCard = (id: string, fromIndex: number, toIndex: number, fromContainerId: string, toContainerId: string) => {
      const task = tasks.find((task: any) => task.id === id);

      task.containerId = toContainerId;
      let updatedList = tasks;

      if (fromIndex > -1 && toIndex > -1) {
        updatedList = update(tasks, {
          $splice: [
            [fromIndex, 1],
            [toIndex, 0, task],
          ],
        });
      }

      this.updateTasksList(updatedList);
    };

    const mappedTasks = tasks.map((item: any, index: any) => ({ ...item, index }));

    return (
      <DemoWrapper>
        {
          containers.map((container: any) => {
            const filteredTasks = mappedTasks.filter((task: any) => task.containerId === container.id);

            return (<Container data={container} key={container.id} tasks={filteredTasks} moveCard={moveCard}/>)
          })
        }
      </DemoWrapper>
    );
  }
}

export default Demo;

const DemoWrapper = styled.div`
  padding: 300px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const todoContainerId = v4();
const doneContainerId = v4();
const inProgressContainerId = v4();

const data = {
  containers: [
    {
      id: todoContainerId,
      name: "Todo"
    },
    {
      id: inProgressContainerId,
      name: "In Progress"
    },
    {
      id: doneContainerId,
      name: "Done"
    }
  ],
  tasks: [
    {
      id: v4(),
      text: "Task 1",
      containerId: todoContainerId
    },
    {
      id: v4(),
      text: "Task 2",
      containerId: todoContainerId
    },
    {
      id: v4(),
      text: "Task 3",
      containerId: todoContainerId
    },
    {
      id: v4(),
      text: "Task 4",
      containerId: doneContainerId
    },
    {
      id: v4(),
      text: "Task 5",
      containerId: doneContainerId
    },
    {
      id: v4(),
      text: "Task 6",
      containerId: doneContainerId
    },
    {
      id: v4(),
      text: "Task 7",
      containerId: doneContainerId
    },
    {
      id: v4(),
      text: "Task 8",
      containerId: inProgressContainerId
    },
    {
      id: v4(),
      text: "Task 9",
      containerId: inProgressContainerId
    },
    {
      id: v4(),
      text: "Task 10",
      containerId: inProgressContainerId
    },
  ]
};
