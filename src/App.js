import { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

import './App.css';

import landing_bg from "./assets/opening.jpg"
import entrees_bg from "./assets/entree.jpg"
import sides_bg from "./assets/side-dish.jpg"
import bread_bg from "./assets/bread.jpg"
import treats_bg from "./assets/dessert.jpg"


import testjson from "./recipes/test.json"

const jsons = [testjson, testjson]

function App() {
  const titles = ["home", "entrees", "sides", "treats", "misc"];
  const colors = ["red", "orng", "yelo", "blue", "purp"];

  const [searchParams] = useSearchParams();
  const json_id = searchParams.get('json_id');

  const contents = [<Home />, 
  <RecipeSection jsonid={0} title={titles[1]} title_fs={"17vh"} bg={entrees_bg} />, 
  <RecipeSection jsonid={0} title={titles[2]} title_fs={"19vh"} bg={sides_bg} />, 
  <RecipeSection jsonid={0} title={titles[3]} title_fs={"19vh"} bg={treats_bg} />, 
  <RecipeSection jsonid={0} title={titles[4]} title_fs={"19vh"} bg={bread_bg} />]

  const [selectedId, setSelected] = useState(0);

  return (
    <div className="App">
      <RecipeWindow />
      <main className='d-flex position-relative p-0 '>
        {contents.map((value, index) => {
          return (
            <section id={index === selectedId ? "selected" : index > selectedId ? "right" : ""} className={`SectionItem text-invert bg-${colors[index]} h-100`} onClick={() => { setSelected(index) }} style={{ zIndex: index, "--index": index }}>
              <SectionTitle >{index + ". " + titles[index]}</SectionTitle>
              <div className='SectionContents h-100 overflow-scroll' style={{ "--section-color": `var(--${colors[index]})` }}>
                {value}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <p className='lh-1 h-100 d-flex flex-column mt-5 pt-5 SectionTitle text-stroke text-invert font-sans'>{children.split("").map((val) => { return (<span>{val}<br /></span>) })}</p>
  )
}

const RecipeWindow = () => {
  const [searchParams] = useSearchParams();
  const navi = useNavigate();
  
  const json_id = searchParams.get('json_id');
  const recipe_id = searchParams.get('recipe_id');

  const visible = json_id != null && recipe_id != null;
  const recipe = visible ? jsons[json_id][recipe_id] : {};

  return (
    <section id={visible ? "reveal" : ""} className='text'>
      <figure className='RecipeWindowBacking' onClick={()=>{navi("/")}} />
      <Link to="/"><i title="Close" className="bi bi-x-circle closebutton" /></Link>
      <article className='RecipeWindow rounded rounded-3'>
        <div className='mt-4 w-100 d-flex justify-content-around  position-relative'>
          <div className='RecipeHeading mt-3'>
            <h1 className=' display-4 font-fun text-center mb-4 pb-2'>{visible ? recipe.name : ""}</h1>
            <div className='d-flex justify-content-evenly  fs-5 mx-2 font-sans'>
              <p className='text-center'><span className='d-inline-block text border-bottom border-1 border-black w-100 mb-1 fw-bolder px-5'>Servings</span><br />{recipe.servings}</p>
              <p className='text-center'><span className='d-inline-block text border-bottom border-1 border-black w-100 mb-1 fw-bolder px-5'>Prep Time</span><br />{recipe.preptime}</p>
              <p className='text-center'><span className='d-inline-block text border-bottom border-1 border-black w-100 mb-1 fw-bolder px-5'>Cook Time</span><br />{recipe.cooktime}</p>
            </div>
          </div>
          <img className='img-thumbnail ' src="./media/treats/chocolatechipcookies.jpg" alt="recipe" />
        </div>

        <div className='mx-5 mt-3 w-100 d-flex'>
          <div className='me-5 ' style={{minWidth:"20%"}}>
            <p className='fs-4 font-fun'>Ingredients</p>
            <ul className='fs-5 lh-sm font-sans'>
              {visible ? recipe.ingredients.map((val, index) => { return <li key={index}>{val}</li> }) : <li></li>}
            </ul>
          </div>
          <figure className='border-end border-1 border-dark mx-3 mt-5' />
          <div className="ms-5">
            <p className='font-fun fs-4 '>Steps</p>
            <ol className='fs-5 font-sans'>
              {visible ? recipe.steps.map((val, index) => { return <li key={index}>{val}</li> }) : <li></li>}
            </ol>
          </div>
        </div>
      </article>
    </section>
  )
}


function Home() {

  return (
    <section id="home" className="bg-darker landing">
      <img className="backdrop" alt="landing background, man clapping hands with flour dust cloud" src={landing_bg} draggable="false" />
      <h1 className="heading heading-left" style={{ "--fs": "17vh" }}>WELCOME</h1>
      <h1 className="heading heading-right" style={{ "--fs": "17vh" }}>WELCOME</h1>
      <div className='w-75 px-4 pt-5 m-auto'>

      </div>
    </section>
  );
};

function RecipeSection({ jsonid, title, title_fs, bg }) {
  const json = jsons[parseInt(jsonid)];
  return (
    <section id="entrees" className="bg-darker">
      <img className="backdrop" alt='entree section background, short pasta and meet in a white sauce' src={bg} draggable="false" loading='lazy' />
      <h1 className="heading heading-left" style={{ "--fs": title_fs }}>{title}</h1>
      <h1 className="heading heading-right" style={{ "--fs": title_fs }}>{title}</h1>
      <div className='w-75 px-4 pt-5 m-auto d-flex flex-wrap justify-content-center overflow-hidden'>
        {json.map((val, index) => {
          return (
            <div className='RecipeCard card m-3 bg text ' >
              <img src={val.image} alt={`card of ${val.name}`} className='card-img-top' loading='lazy' />
              <div className='card-body m-1'>
                <h5 className='card-title font-fun'>{val.name}</h5>
                <p className='card-text font-sans'>{val.desc}</p>
                <Link class="btn col-12 mt-1 font-sans fw-bolder " to={`/?json_id=${jsonid}&recipe_id=${index}`}>Open Recipe</Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}



export default App;
