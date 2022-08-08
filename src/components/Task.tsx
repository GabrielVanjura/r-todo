import { CheckCircle, Circle, Trash } from 'phosphor-react'

import styles from './Task.module.css';

interface ITaskProps {
  onDelete: (id: number) => void;
  doneTask: (id: number) => void;
  done: boolean;
  content: string;
  id: number;
}

export function Task({ onDelete, doneTask, done, content, id }: ITaskProps) {

  function handleDeleteTask() {
    onDelete(id)
  }
  function handleDoneTask() {
    doneTask(id)
  }

  return (
    <>
      <div className={styles.task}>
        <button onClick={handleDoneTask}>
          {
            done === true ? (
              <CheckCircle size={32} color="#5E60CE" />
            ) :
              (
                <Circle size={32} color="#4EA8DE" />
              )
          }

        </button>
        <p>{content}</p>
        <button
          type='submit'
          title="Deletar comentário"
          onClick={handleDeleteTask}
        >
          <Trash size={32} />
        </button>
      </div>
    </>
  )
}