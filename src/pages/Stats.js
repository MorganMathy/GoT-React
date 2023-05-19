import React, { useState, useEffect } from 'react';
import { getBookStats, getCharactersStats, getHousesStats } from '../services/ApiStats';
import ReactECharts from 'echarts-for-react';
import Spinner from 'react-bootstrap/Spinner';

const Stats = () => {
  const [bookStats, setBookStats] = useState({});
  const [characterStats, setCharacterStats] = useState({});
  const [houseStats, setHouseStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const bookStats = await getBookStats();
      const characterStats = await getCharactersStats();
      const houseStats = await getHousesStats();
      setBookStats(bookStats);
      setCharacterStats(characterStats);
      setHouseStats(houseStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  return (
    <div>
      <h2>Stats Page</h2>

      <div>
        <h3>Book Stats</h3>
        <div>
          <h4>Books by Released Year</h4>
          {bookStats.years && bookStats.bookCounts ? (
            <ReactECharts
              option={{
                tooltip: {},
                xAxis: { type: 'category', data: bookStats.years },
                yAxis: { type: 'value' },
                series: [
                  {
                    name: 'Books',
                    type: 'bar',
                    data: bookStats.bookCounts,
                  },
                ],
              }}
              style={{ height: '300px' }}
            />
          ) : (
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
        <div>
          <h4>Pages per Book</h4>
          {bookStats.pagesByBook ? (
            <ReactECharts
              option={{
                tooltip: {},
                xAxis: {
                  type: 'category',
                  data: bookStats.pagesByBook.map((book) => book.name),
                },
                yAxis: { type: 'value' },
                series: [
                  {
                    name: 'Pages',
                    type: 'line',
                    data: bookStats.pagesByBook.map((book) => book.pages),
                  },
                ],
              }}
              style={{ height: '300px' }}
            />
          ) : (
            <Spinner animation="border" variant="primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
        </div>
      </div>

      <div>
        <h3>Character Stats</h3>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h4>Dead vs. Alive Characters</h4>
            {characterStats.deadCharacters !== undefined && characterStats.aliveCharacters !== undefined ? (
              <ReactECharts
                option={{
                  tooltip: {},
                  series: [
                    {
                      name: 'Characters',
                      type: 'pie',
                      data: [
                        {
                          name: 'Dead',
                          value: characterStats.deadCharacters,
                        },
                        {
                          name: 'Alive',
                          value: characterStats.aliveCharacters,
                        },
                      ],
                    },
                  ],
                }}
                style={{ height: '300px' }}
              />
            ) : (
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h4>Male vs. Female Characters</h4>
            {characterStats.maleCharacters !== undefined && characterStats.femaleCharacters !== undefined ? (
              <ReactECharts
                option={{
                  tooltip: {},
                  series: [
                    {
                      name: 'Characters',
                      type: 'pie',
                      data: [
                        {
                          name: 'Male',
                          value: characterStats.maleCharacters,
                        },
                        {
                          name: 'Female',
                          value: characterStats.femaleCharacters,
                        },
                      ],
                    },
                  ],
                }}
                style={{ height: '300px' }}
              />
            ) : (
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3>House Stats</h3>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h4>Alive vs. Dead Houses</h4>
            {houseStats.aliveHouses !== undefined && houseStats.deadHouses !== undefined ? (
              <ReactECharts
                option={{
                  tooltip: {},
                  series: [
                    {
                      name: 'Houses',
                      type: 'pie',
                      data: [
                        {
                          name: 'Alive',
                          value: houseStats.aliveHouses,
                        },
                        {
                          name: 'Dead',
                          value: houseStats.deadHouses,
                        },
                      ],
                    },
                  ],
                }}
                style={{ height: '300px' }}
              />
            ) : (
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <h4>Houses with Ancestral Weapons</h4>
            {houseStats.housesWithAncestralWeapons !== undefined && houseStats.housesWithoutAncestralWeapons !== undefined ? (
              <ReactECharts
                option={{
                  tooltip: {},
                  series: [
                    {
                      name: 'Houses',
                      type: 'pie',
                      data: [
                        {
                          name: 'With Ancestral Weapons',
                          value: houseStats.housesWithAncestralWeapons,
                        },
                        {
                          name: 'Without Ancestral Weapons',
                          value: houseStats.housesWithoutAncestralWeapons,
                        },
                      ],
                    },
                  ],
                }}
                style={{ height: '300px' }}
              />
            ) : (
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
