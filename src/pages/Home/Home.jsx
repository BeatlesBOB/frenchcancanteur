import VeterinaryList from '../../components/VeterinaryList/VeterinaryList'

export default function Home() {
    
    return (
        <div className="home">
            <div className="home__container">
                <h1 className="home__title">Home</h1>
                <VeterinaryList />
            </div>
        </div>
    )
}
