import React, { useState } from 'react';  // React と useState フックをインポート

// Todo型の定義 - タスクの構造を定義
type Todo = {
  title: string;              // タスクのタイトル
  readonly id: number;        // タスクの一意のID（変更不可）
  completed_flg: boolean;     // タスクの完了状態
  delete_flg: boolean;        // タスクの削除状態
};

// フィルターの型定義 - タスクの表示状態を管理
type Filter = 'all' | 'completed' | 'unchecked' | 'delete';  // フィルターの選択肢を定義

const Todo: React.FC = () => {  // Todoコンポーネントの定義開始
  // 状態管理の定義
  const [todos, setTodos] = useState<Todo[]>([]);     // タスクリストの状態
  const [text, setText] = useState('');               // 入力フォームの状態
  const [nextId, setNextId] = useState(1);           // 次のタスクIDの状態
  const [filter, setFilter] = useState<Filter>('all'); // フィルター状態

  // 新しいタスクを追加する関数
  const handleSubmit = () => {
    if (!text) return;  // テキストが空の場合は何もしない

    const newTodo: Todo = {  // 新しいタスクオブジェクトを作成
      title: text,
      id: nextId,
      completed_flg: false,
      delete_flg: false,
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);  // 新しいタスクを配列の先頭に追加
    setNextId(nextId + 1);  // 次のIDを更新
    setText('');            // 入力フォームをクリア
  };

  // フィルター条件に応じてタスクをフィルタリングする関数
  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':  // 完了済みタスクのみ表示
        return todos.filter((todo) => todo.completed_flg && !todo.delete_flg);
      case 'unchecked':  // 未完了タスクのみ表示
        return todos.filter((todo) => !todo.completed_flg && !todo.delete_flg);
      case 'delete':     // 削除済みタスクのみ表示
        return todos.filter((todo) => todo.delete_flg);
      default:           // すべての未削除タスクを表示
        return todos.filter((todo) => !todo.delete_flg);
    }
  };

  // タスクのタイトルを編集する関数
  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, title: value };  // 指定されたタスクのタイトルを更新
        }
        return todo;
      });
      return newTodos;
    });
  };

  // タスクの完了状態を切り替える関数
  const handleCheck = (id: number, completed_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed_flg };  // 完了状態を更新
        }
        return todo;
      });
      return newTodos;
    });
  };

  // タスクの削除状態を切り替える関数
  const handleRemove = (id: number, delete_flg: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, delete_flg };  // 削除状態を更新
        }
        return todo;
      });
      return newTodos;
    });
  };

  // フィルター状態を変更する関数
  const handleFilterChange = (filter: Filter) => {
    setFilter(filter);
  };

  // 削除済みタスクを完全に削除する関数
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.delete_flg));
  };

  // UIのレンダリング
  return (
    <div className="todo-container">
      {/* フィルター選択のセレクトボックス */}
      <select
        defaultValue="all"
        onChange={(e) => handleFilterChange(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="completed">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="delete">ごみ箱</option>
      </select>

      {/* ごみ箱表示時のみ表示される空にするボタン */}
      {filter === 'delete' ? (
        <button onClick={handleEmpty}>ごみ箱を空にする</button>
      ) : (
        // 完了タスク表示以外で表示される入力フォーム
        filter !== 'completed' && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="insert-btn" type="submit">追加</button>
          </form>
        )
      )}

      {/* タスクリストの表示 */}
      <ul>
        {getFilteredTodos().map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed_flg}
              onChange={() => handleCheck(todo.id, !todo.completed_flg)}
            />
            <input
              type="text"
              value={todo.title}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleRemove(todo.id, !todo.delete_flg)}>
              {todo.delete_flg ? '復元' : '削除'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;  // Todoコンポーネントをエクスポート