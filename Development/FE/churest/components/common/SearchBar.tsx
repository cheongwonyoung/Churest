export default function SearchBar() {
  return (
    <>
      <div>
        <div className="inside-clay bird-input center search-input">
          <input type="text" placeholder="친구 태그하기"></input>
        </div>
      </div>
      <style jsx>{`
        .search-input {
          width: 300px;
          height: 40px;
        }
        input {
          width: 200px;
          background: transparent;
          outline: 0px;
          border: none;
          text-align: center;
        }
      `}</style>
    </>
  );
}
