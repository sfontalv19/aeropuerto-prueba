import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import AirportCards from "@/components/AirportCard";
import { useAirportStore } from "@/store/airportStore";

jest.mock("@/store/airportStore");
jest.mock("next-image", () => {
  return function MockedImage(props: any) {
    return <img {...props} />;
  };
});

jest.mock("next-link", () => {
  return function MockedLink({ children, ...props }: any) {
    return <a {...props}>{children}</a>;
  };
});

describe("AirportCards Component", () => {

  const mockStore = (customState: any) => {
    (useAirportStore as unknown as jest.Mock).mockReturnValue({
      airports: [],
      loading: false,
      error: null,
      setSelectedAirport: jest.fn(),
      ...customState,
    });
  };

  test("Muestra mensaje de carga cuando loading = true", () => {
    mockStore({ loading: true });

    render(<AirportCards />);
    
    expect(screen.getByText(/Cargando aeropuertos/i)).toBeInTheDocument();
  });

  test("Muestra mensaje de error cuando existe error", () => {
    mockStore({ error: "Fallo la conexión" });

    render(<AirportCards />);
    
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    expect(screen.getByText(/Fallo la conexión/i)).toBeInTheDocument();
  });

  test("Muestra mensaje de lista vacía cuando no hay aeropuertos", () => {
    mockStore({ airports: [] });

    render(<AirportCards />);

    expect(screen.getByText(/No se encontraron aeropuertos/i)).toBeInTheDocument();
  });

  test("Renderiza tarjetas de aeropuertos correctamente", () => {
    const mockAirports = [
      {
        id: "1",
        airport_name: "Jose Maria Cordova",
        city_iata_code: "MDE",
        country_name: "Colombia",
        iata_code: "MDE"
      },
      {
        id: "2",
        airport_name: "El Dorado",
        city_iata_code: "BOG",
        country_name: "Colombia",
        iata_code: "BOG"
      }
    ];

    mockStore({ airports: mockAirports });

    render(<AirportCards />);

    expect(screen.getByText("Jose Maria Cordova")).toBeInTheDocument();
    expect(screen.getByText("El Dorado")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  test("Ejecuta setSelectedAirport al hacer click en una tarjeta", () => {
    const setSelectedAirportMock = jest.fn();

    const mockAirports = [
      {
        id: "1",
        airport_name: "Jose Maria Cordova",
        city_iata_code: "MDE",
        country_name: "Colombia",
        iata_code: "MDE"
      }
    ];

    mockStore({ airports: mockAirports, setSelectedAirport: setSelectedAirportMock });

    render(<AirportCards />);

    const card = screen.getByRole("link");
    fireEvent.click(card);

    expect(setSelectedAirportMock).toHaveBeenCalledWith(mockAirports[0]);
  });
});
