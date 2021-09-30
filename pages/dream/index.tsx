import useLogin from './hooks/useLogin';

function DreamPage() {
  const { password, onChange, onLogin } = useLogin();

  return (
    <div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <button onClick={onLogin}>로그인</button>
      </div>
    </div>
  );
}

export default DreamPage;
