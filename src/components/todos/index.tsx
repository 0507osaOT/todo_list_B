import React, { useState } from 'react'; // React と useState フックをインポート

// Todo型の定義 - アプリケーション全体で使用する型を定義
type Todo = {
  title: string;       // Todoのタイトル
  readonly id: number; // 読み取り専用のID（変更不可）
  completed_flg: boolean; // 完了フラグ
  delete_flg: boolean, // 削除フラグ
};

const Todo: React.FC = () => { // 関数コンポーネントとして Todo を定義
  // 状態管理用のフック定義
  const [todos, setTodos] = useState<Todo[]>([]); // Todoリストの状態管理
  const [text, setText] = useState('');           // 入力フォームの状態管理
  const [nextId, setNextId] = useState(1);        // 次のTodoのID管理

  const handleSubmit = () => { // 新しいTodoを追加する関数
    if (!text) return; // 空の入力の場合は処理を中断

    const newTodo: Todo = { // 新しいTodoオブジェクトを作成
      title: text,
      id: nextId,
      completed_flg: false, // 初期状態は未完了
      delete_flg: false,    // 初期状態は未削除
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]); // 新しいTodoを配列の先頭に追加
    setNextId(nextId + 1); // 次のIDを更新
    setText(''); // 入力フォームをクリア
  };

  const handleEdit = (id: number, value: string) => { // Todo編集用の関数
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) { // 編集対象のTodoを見つけたら
          return { ...todo, title: value }; // タイトルを更新
        }
        return todo;
      });
      
      // デバッグ用のログ出力
      console.log('=== Original todos ===');
      todos.map((todo) => {
        console.log(`id: ${todo.id}, title: ${todo.title}`);
      });

      return newTodos;
    });
  };

  const handleCheck = (id: number, completed_flg: boolean) => { // 完了状態切り替え用の関数
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) { // 対象のTodoを見つけたら
          return { ...todo, completed_flg }; // 完了フラグを更新
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, delete_flg: boolean) => { // 削除状態切り替え用の関数
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) { // 対象のTodoを見つけたら
          return { ...todo, delete_flg }; // 削除フラグを更新
        }
        return todo;
      });
      return newTodos;
    });
  };

  return ( // UIのレンダリング
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // フォームのデフォルト送信を防止
          handleSubmit();    // Todo追加処理を実行
        }}
      >
        <input
          type="text"
          value={text} // 入力値をstateと紐付け
          onChange={(e) => setText(e.target.value)} // 入力値が変更されたらstateを更新
        />
        <button className="insert-btn" type="submit">追加</button>
      </form>
      <ul>
        {todos.map((todo) => ( // Todoリストをマップして表示
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed_flg} // 完了状態を反映
              onChange={() => handleCheck(todo.id, !todo.completed_flg)} // チェックボックスの状態を切り替え
            />
            <input
              type="text"
              value={todo.title}
              disabled={todo.completed_flg} // 完了時は編集不可
              onChange={(e) => handleEdit(todo.id, e.target.value)} // タイトル編集時の処理
            />
            <button onClick={() => handleRemove(todo.id, !todo.delete_flg)}> {/* 削除/復元ボタン */}
              {todo.delete_flg ? '復元' : '削除'} {/* 状態に応じてボタンのテキストを切り替え */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo; // コンポーネントをエクスポート