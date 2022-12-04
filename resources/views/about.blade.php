@extends('layouts.app')

@section('content')

<p align="center"><a href="http://localhost:8000/api/documentation" target="_blank"><img src="{{ asset('/images/bonsai-app-api-logo.png') }}" width="600"></a></p>

<div class="pt-3">
    <nav class="navbar navbar-dark navbar-expand-sm bg-secondary justify-content-center">
        <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="{{ route('welcome') }}">Website</a></li>
            <li class="nav-item"><a class="nav-link" href="http://localhost:8000/api/documentation">API Documentation</a></li>
            <li class="nav-item"><a class="nav-link" href="https://github.com/Jadersonrilidio/bonsai_app_with_vue_laravel">GitHub Repository</a></li>
        </ul>
    </nav>
</div>

@endsection
