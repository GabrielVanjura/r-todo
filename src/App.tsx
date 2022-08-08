import Logo from './assets/logo.svg'

import styles from './App.module.css'

import './global.css'
import { Task } from './components/Task'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ListChecks, PlusCircle } from 'phosphor-react'

function App() {

  const [task, setTask] = useState([
    {
      id: 1,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, natus ex blanditiis eligendi quae vero commodi voluptates nesciunt! Omnis sunt iure ea quisquam velit minima inventore vel obcaecati ipsa enim?",
      done: false
    },
    {
      id: 2,
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus molestias eum dolor veritatis expedita dicta perferendis deserunt rerum neque molestiae. Magnam, doloribus alias eum aperiam nemo distinctio quidem porro. Voluptatibus.",
      done: true
    },
    {
      id: 3,
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus quibusdam officia vero natus quis? Nemo reiciendis quod nesciunt numquam quidem saepe alias cupiditate fuga neque qui, cumque ea voluptate voluptatibus!",
      done: true
    },
    {
      id: 4,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus eveniet maxime, totam qui a dolor consequuntur facere deleniti id! Labore expedita, sint animi a similique ipsa saepe asperiores corporis accusantium.",
      done: false
    }
  ])
  const [inputTask, setInputTask] = useState('')

  function handleCrateNewTask(event: FormEvent) {
    event.preventDefault()

    const id = task[task.length - 1].id + Math.random()

    const newTask = {
      id,
      content: inputTask,
      done: false
    }

    setTask([...task, newTask]);
    setInputTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setInputTask(event.target.value);
  }

  function deleteTask(id: number) {
    const tasksWithoutDeletedOne = task.filter(t => {
      return t.id !== id;
    })
    setTask(tasksWithoutDeletedOne);
  }

  function doneTask(id: number) {
    const currentTask = task.find(t => t.id === id)
    if (currentTask !== undefined) {
      currentTask.done = currentTask.done === true ? false : true;
      const tasksWithoutDeletedOne = task.filter(t => {
        return t.id !== id;
      })

      const lst = [...tasksWithoutDeletedOne, currentTask];
      lst.sort((a, b) => a.id - b.id)
      console.log(lst)
      setTask(lst);
    }
  }

  const tasks_done = {
    total: task.length,
    done: task.filter(t => t.done === true).length
  };

  return (
    <>
      <header className={styles.header}>
        <img src={Logo} />
      </header>
      <form className={styles.inputToDo}>
        <input
          value={inputTask}
          onChange={handleNewTaskChange}
          placeholder="Adicione uma Tarefa"
        />
        <button onClick={handleCrateNewTask}>
          Criar <PlusCircle size={32} />
        </button>
      </form>
      <section className={styles.section}>
        <div className={styles.taskLabel}>
          <span className={styles.taskLabelCreated}>Tarefas Criadas <label className={styles.badge}>{tasks_done.total}</label></span>
          <span className={styles.taskLabelDone}>Concluídas <label className={styles.badge}>{tasks_done.done} de {tasks_done.total}</label></span>
        </div>
      </section>
      {
        task.length > 0 ?
          task.map(t => (
            <Task
              id={t.id}
              onDelete={deleteTask}
              content={t.content}
              doneTask={doneTask}
              done={t.done}
            />
          )) :
          (
            <article className={styles.container}>
              <ListChecks size={32} />
              <p className={styles.title}>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </article>
          )
      }
    </>
  )
}

export default App
