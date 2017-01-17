import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Row, Col, CardPanel } from 'react-materialize'
import { TeamsTable } from './Teams'


class App extends Component {

	constructor() {
		super();
		this.state = {
			center: {
				lat: -3.822283, 
				lng: -38.502552
			}, 
			zoom: 11, 
			selectedTeams: []
		};

		var self = this;
		this.onTeamSelected = function(team) {
			if(team.location) {
				self.setState({ 
					selectedTeams: [ team ], 
					center: {
						lat: team.location.lat, 
						lng: team.location.lng, 
					}
				});
			}
		}
	}

	render() { 
		return (
			<Row className="blue-grey lighten-5"> 
				<Col s={10} offset={'s1'}>
					<CardPanel>
						<Map className="mapContainer" animate={true} center={this.state.center} zoom={this.state.zoom}>
							<TileLayer
								attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
							/>
							{
								this.state.selectedTeams.map(function(team) {
									return (
										<Marker position={team.location}>
											<Popup>
												<span>{team.equipe} - {team.academia}</span>
											</Popup>
										</Marker>
									);
								})
							}
						</Map>
					</CardPanel>

					<CardPanel>
						<TeamsTable onTeamSelected={ this.onTeamSelected }></TeamsTable>
					</CardPanel>

				</Col>
			</Row>
		);
	}
}

export default App;
