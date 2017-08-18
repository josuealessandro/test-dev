 <meta charset="UTF-8">
API docs<br />
==============================<br /><br />

<table>
<tr>
	<td>Requisição</td>
	<td>Descrição</td>
	<td>Tipo</td>
	<td>Exemplo</td>
</tr>
<tr>
	<td><code>/carros</code></td> 
	<td>Lista completa de registros </td>
	<td>[GET]</td>
	<td>api.php/carros</td>
</tr>
<tr>
	<td><code>/carros/search?{filtro}</code></td>
	<td>Lista os registros utilizando filtros </td>
	<td>[GET]</td>
	<td>api.php/carros/search?marca=fiat</td>
</tr>
<tr>
	<td><code>/carros/search?{filtro}&{filtro}</code></td>
	<td>Lista os registros utilizando vários filtros</td>
	<td>[GET]</td>
	<td>api.php/carros/search?marca=fiat&modelo=palio&ano=2017</td>
</tr>
<tr>
	<td><code>/carros/search?{filtro}&conector=:conector</code></td>
	<td>Configura o conector de busca: OR ou AND	</td>
	<td>[GET]</td>
	<td>api.php/carros/search?marca=fiat&modelo=fiat&conector=OR</td>
</tr>
<tr>
	<td><code>/carros/search?{filtro}&orderby=:campo</code></td>
	<td>Ordena a busca pelo campo especificado</td>
	<td>[GET]</td>
	<td>api.php/carros/search?marca=fiat&orderby=marca</td>
</tr>
<tr>
	<td><code>/carros/search?{filtro}&{orderby}&asc=:valor</code></td>
	<td> Ordena a busca de forma ascendente ou descendente</td>
	<td>[GET]</td>
	<td>api.php/carros/search?marca=fiat&orderby=marca&asc=true</td>
</tr>
<tr>
	<td><code>/carros/id=:id</code>	</td>
	<td>Deleta um registro	</td>
	<td>[DELETE]</td>
	<td>api.php/carros/id=1</td>
</tr>
<tr>
	<td><code>/carros/id=:id</code></td>
	<td>Altera um registro</td>
	<td>[PUT]</td>
	<td>api.php/carros/id=2</td>
</tr>
<tr>
	<td><code>/carros/id=:id</code></td>
	<td>Adiciona um registro</td>
	<td>[POST]</td>
	<td>api.php/carros/</td>
</tr>
</table>
<ul>
	<b>Filtros Disponíveis:</b>
	<code>
		<li>search?marca=:marca</li>
		<li>search?modelo=:modelo</li>
		<li>search?ano={[ano]-[ano]}</li>
		<blockquote>
			Ano específico: ano=1999<br />
			Faixa de ano: ano=1999-2013<br />
		</blockquote>
		<li>search?{filtro}&conector=:conector</li>
		<blockquote>
			Conector do tipo AND: conector=AND <br />
			Conector do tipo OR: conector=OR<br />
		</blockquote>	
		<li>search?{filtro}&{orderby}&asc=:valor</li>
		<blockquote>
			Ordenação ascendente: asc=true<br />
			Ordenação descendente: asc=false<br />
		</blockquote></code>
		<b>Alteração:</b>
		<code>
		<li>Passar JSON no body da requisição</li>
		<li>Exemplo: {"NOME_MARCA":"VALOR","NOME_MODELO":"VALOR","ANO":"VALOR"}</li></code>
		<b>Adição:<b/>
		<code>
		<li>Passar JSON no body da requisição</li>
		<li>Exemplo: {"NOME_MARCA":"VALOR","NOME_MODELO":"VALOR","ANO":"VALOR"}</li>
	</code>
</ul>
